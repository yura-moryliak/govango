import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import { UserDevicesService } from '../user-devices/user-devices.service';
import { UserDeviceEntity } from '../user-devices/user-device.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userDevicesService: UserDevicesService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result as UserEntity;
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async login(
    user: any,
    fingerprint: string,
    req: Request,
    res: Response,
  ): Promise<{ access_token: string }> {
    if (!fingerprint) {
      throw new HttpException('Fingerprint is missing', HttpStatus.BAD_REQUEST);
    }

    const payload = { sub: user.id, email: user.email };
    const access_token: string = this.jwtService.sign(payload);
    const refresh_token: string = this.generateRefreshToken(user.id);

    await this.userDevicesService.registerDevice(
      user,
      fingerprint,
      refresh_token,
    );

    this.setCookies(req, res, refresh_token);
    return { access_token };
  }

  async refreshTokens(
    req: Request,
    res: Response,
    fingerprint: string,
  ): Promise<{ access_token: string }> {
    const refreshToken: string | undefined = req.cookies['refresh_token'];

    if (!fingerprint) {
      throw new HttpException('Fingerprint missing', HttpStatus.BAD_REQUEST);
    }

    if (!refreshToken) {
      await this.userDevicesService.removeDeviceByFingerprint(fingerprint);
      throw new HttpException('Refresh token missing', HttpStatus.UNAUTHORIZED);
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      await this.userDevicesService.removeDeviceByFingerprint(fingerprint);
      throw new HttpException(
        'Refresh token expired or invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const device: UserDeviceEntity =
      await this.userDevicesService.findDeviceByToken(
        fingerprint,
        refreshToken,
      );

    if (!device) {
      throw new HttpException(
        'Device not found for given refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.userDevicesService.updateLastActive(device.id);

    const access_token = this.jwtService.sign({
      sub: device.user.id,
      email: device.user.email,
    });

    const refresh_token = this.generateRefreshToken(device.user.id);
    await this.userDevicesService.updateRefreshToken(
      device.user.id,
      refresh_token,
    );
    this.setCookies(req, res, refresh_token);

    return { access_token };
  }

  async logout(
    fingerprint: string,
    req: Request,
    res: Response,
  ): Promise<void> {
    if (!fingerprint) {
      throw new HttpException('Fingerprint missing', HttpStatus.BAD_REQUEST);
    }

    const device =
      await this.userDevicesService.findDeviceByFingerprint(fingerprint);

    if (device) {
      await this.userDevicesService.removeDeviceByFingerprint(fingerprint);
    }

    this.clearCookies(req, res);
  }

  generateRefreshToken(userId: string): string {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRES_IN_DAYS',
        ),
        // expiresIn: '1m', // For tests
      },
    );
  }

  private setCookies(req: Request, res: Response, refresh_token: string): void {
    const isSwagger: boolean =
      req.headers['user-agent']?.includes('Swagger') ||
      req.headers['referer']?.includes('/api/swagger');

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.get<boolean>('COOKIE_REFRESH_TOKEN_SECURE'),
      sameSite: this.configService.get<'lax' | 'strict' | 'none'>(
        'COOKIE_REFRESH_TOKEN_SAME_SITE',
      ),
      path: isSwagger
        ? '/'
        : this.configService.get<string>('COOKIE_REFRESH_TOKEN_PATH'),
      maxAge:
        +this.configService.get<string>('COOKIE_REFRESH_TOKEN_MAX_AGE') *
        24 *
        60 *
        60 *
        1000,
      // maxAge: 60 * 1000, // 1 minutes for tests as refresh token expires in 1 minute
    });
  }

  private clearCookies(req: Request, res: Response): void {
    const isSwagger: boolean =
      req.headers['user-agent']?.includes('Swagger') ||
      req.headers['referer']?.includes('/api/swagger');

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: this.configService.get<boolean>('COOKIE_REFRESH_TOKEN_SECURE'),
      sameSite: this.configService.get<'lax' | 'strict' | 'none'>(
        'COOKIE_REFRESH_TOKEN_SAME_SITE',
      ),
      path: isSwagger
        ? '/'
        : this.configService.get<string>('COOKIE_REFRESH_TOKEN_PATH'),
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import {
  USER_ENTITY_WITH_REFRESH_TOKEN_SELECT,
  UserEntity,
} from '../users/user.entity';
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

  // async login(
  //   user: UserEntity,
  // ): Promise<{ access_token: string; refresh_token: string }> {
  //   const payload = { userId: user.id, email: user.email };
  //   const access_token = this.jwtService.sign(payload);
  //   const refresh_token = this.generateRefreshToken(user.id);
  //
  //   await this.usersService.updateRefreshToken(user.id, refresh_token);
  //   return { access_token, refresh_token };
  // }

  async login(user: any, ip: string, userAgent: string) {
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.generateRefreshToken(user.id);

    await this.userDevicesService.registerDevice(
      user,
      ip,
      userAgent,
      refresh_token,
    );

    return { access_token, refresh_token };
  }

  // async refreshTokens(
  //   userId: string,
  //   refreshToken: string,
  // ): Promise<{ access_token: string; refresh_token: string }> {
  //   const user: UserEntity = await this.usersService.findOne(
  //     userId,
  //     USER_ENTITY_WITH_REFRESH_TOKEN_SELECT,
  //   );
  //
  //   if (!user || user.refreshToken !== refreshToken) {
  //     throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
  //   }
  //
  //   return this.login(user);
  // }

  async refreshTokens(refreshToken: string) {
    const device: UserDeviceEntity =
      await this.userDevicesService.findDeviceByToken(refreshToken);
    if (!device) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    await this.userDevicesService.updateLastActive(device.id);
    return this.login(device.user, device.ip, device.userAgent);
  }

  async logout(userId: string, req: any) {
    const ip = req.ip || 'Unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';
    return this.userDevicesService.removeDeviceByIpAndAgent(
      userId,
      ip,
      userAgent,
    );
  }

  generateRefreshToken(userId: string): string {
    return this.jwtService.sign(
      { sub: userId },
      {
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRES_IN_DAYS',
        ),
      },
    );
  }
}

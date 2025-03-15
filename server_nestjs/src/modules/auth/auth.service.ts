import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result as UserEntity;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(
    user: any,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.generateRefreshToken(user.id),
    };
  }

  generateRefreshToken(userId: number): string {
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

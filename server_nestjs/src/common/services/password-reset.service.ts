import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcryptjs from 'bcryptjs';
import { UserEntity } from '../../modules/users/user.entity';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class PasswordResetService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async requestPasswordReset(email: string): Promise<void> {
    const user: UserEntity = await this.usersService.findByEmail(email);

    if (!user) {
      return;
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token: string = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_PASSWORD_RESET_SECRET'),
      expiresIn: this.configService.get<string>('JWT_PASSWORD_RESET_EXPIRES_IN_MIN'),
    });

    user.passwordResetToken = token;
    user.passwordResetExpires = new Date(Date.now() + +this.configService.get<string>('JWT_PASSWORD_RESET_EXPIRES_IN') * 60 * 1000);
    await this.usersService.update(user.id, user);

    const resetLink: string = `${this.configService.get<string>('CLIENT_CORS_ORIGIN')}/reset-password?token=${token}`;
    console.log('Send this to user via email:', resetLink); // TODO NODE MAILER
  }

  async confirmPasswordReset(token: string, password: any): Promise<void> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_PASSWORD_RESET_SECRET'),
      });

      const salt: string = bcryptjs.genSaltSync(10);
      const encodedPassword: string = bcryptjs.hashSync(password, salt);

      const user: UserEntity = await this.usersService.findInternalOne(payload.sub);

      if (!user.passwordResetToken || user.passwordResetToken !== token || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
        throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
      }

      const updatedUser = { ...user, password: encodedPassword, passwordResetToken: null, passwordResetExpires: null };
      await this.usersService.update(user.id, updatedUser);
    } catch (err) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }
  }
}
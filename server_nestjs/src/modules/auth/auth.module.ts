import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UserDevicesModule } from '../user-devices/user-devices.module';
import { PasswordResetService } from '../../common/services/password-reset.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN_MIN'),
          // expiresIn: '30s', // For tests
        },
      }),
    }),
    UserDevicesModule,
  ],
  exports: [AuthService],
  providers: [AuthService, PasswordResetService],
  controllers: [AuthController],
})
export class AuthModule {}

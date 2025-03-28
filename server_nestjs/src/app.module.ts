import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RouterModule } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { typeormFactory } from './db.connection';
import { apiRoutes } from './routes';
import { FallbackController } from './fallback.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CarsModule } from './modules/cars/cars.module';
import { UserDevicesModule } from './modules/user-devices/user-devices.module';

const configurationModules = [
  RouterModule.register(apiRoutes),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../../', 'dist', 'ui', 'browser', 'index.html'),
    serveRoot: '/',
  }),
  ConfigModule.forRoot({
    envFilePath: '.env.development',
    cache: true,
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    useFactory: typeormFactory,
    inject: [ConfigService],
  }),
  CacheModule.register({
    isGlobal: true,
  }),
  MailerModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      transport: {
        host: configService.get('MAIL_HOST'),
        port: configService.get('MAIL_PORT'),
        auth: {
          user: configService.get('MAIL_USER'),
          pass: configService.get('MAIL_PASS'),
        },
      },
      defaults: {
        from: configService.get('MAIL_FROM'),
      },
      template: {
        dir: join(__dirname, '../../src/', 'mail-templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
  }),
];
const commonModules = [AuthModule, UsersModule, CarsModule, UserDevicesModule];

@Module({
  imports: [...configurationModules, ...commonModules],
  controllers: [FallbackController],
})
export class AppModule {}

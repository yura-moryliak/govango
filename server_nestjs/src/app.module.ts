import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RouterModule } from '@nestjs/core';
import { join } from 'path';
import { FallbackController } from './fallback.controller';
import { typeormFactory } from './db.connection';
import { apiRoutes } from './routes';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const configurationModules = [
  RouterModule.register(apiRoutes),
  ServeStaticModule.forRoot({
    rootPath: join(
      __dirname,
      '../../',
      'dist',
      'ui',
      'browser',
      'index.html',
    ),
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
];
const commonModules = [
  AuthModule,
  UsersModule
];

@Module({
  imports: [
    ...configurationModules,
    ...commonModules
  ],
  controllers: [FallbackController],
  providers: [],
})
export class AppModule {}

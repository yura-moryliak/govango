import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager'
import { AppController } from "./app.controller";
import { typeormFactory } from './db.connection';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      cache: true,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeormFactory,
      inject: [ConfigService]
    }),
    CacheModule.register({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

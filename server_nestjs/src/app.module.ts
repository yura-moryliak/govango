import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: true,
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

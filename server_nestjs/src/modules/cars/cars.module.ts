import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CarEntity } from './car.entity';
import { UserEntity } from '../users/user.entity';
import { CarImagesEntity } from './car-images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, UserEntity, CarImagesEntity])],
  exports: [CarsService],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}

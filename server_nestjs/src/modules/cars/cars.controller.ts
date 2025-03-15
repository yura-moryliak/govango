import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { CarDto } from './car.dto';
import { CarEntity } from './car.entity';
import { CarsService } from './cars.service';

@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post(':userId')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async createCar(
    @Param('userId') userId: string,
    @Body() createCarDto: CarDto,
  ): Promise<boolean> {
    await this.carsService.createCar(userId, createCarDto);
    return true;
  }

  @Get()
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<CarEntity[]> {
    return this.carsService.findAll();
  }

  @Get(':userId')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAllByUserId(@Param('userId') userId: string): Promise<CarEntity[]> {
    return await this.carsService.findAllByUserId(userId);
  }

  @Get(':userId/:carId')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findOneByUserId(
    @Param('userId') userId: string,
    @Param('carId') carId: string,
  ): Promise<CarEntity> {
    return this.carsService.findOneByUserId(userId, carId);
  }

  @Put(':userId/:carId')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async updateCar(
    @Param('userId') userId: string,
    @Param('carId') carId: string,
    @Body() updateCarDto: CarDto,
  ): Promise<boolean> {
    await this.carsService.updateCar(userId, carId, updateCarDto);
    return true;
  }

  @Delete(':userId/:carId')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async removeCar(
    @Param('userId') userId: string,
    @Param('carId') carId: string,
  ): Promise<boolean> {
    await this.carsService.remove(userId, carId);
    return true;
  }
}

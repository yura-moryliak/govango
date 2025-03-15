import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CarDto } from './car.dto';
import { CarEntity } from './car.entity';
import { CarsService } from './cars.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post(':userId')
  @ApiOkResponse({ description: 'Car was successfully created for userId' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Car was not created' })
  @ApiParam({ name: 'userId', description: 'User ID', required: true })
  @ApiBody({ type: CarDto })
  async createCar(
    @Param('userId') userId: string,
    @Body() createCarDto: CarDto,
  ): Promise<boolean> {
    await this.carsService.createCar(userId, createCarDto);
    return true;
  }

  @Get(':carId/user')
  @ApiOkResponse({ description: 'User id was found by carId' })
  @ApiNotFoundResponse({ description: 'Car not found by given id' })
  @ApiParam({ name: 'carId', description: 'carId', required: true })
  async getUserIdByCarId(@Param('carId') carId: string): Promise<string> {
    return await this.carsService.findUserIdByCarId(carId);
  }

  @Get()
  @ApiOkResponse({ description: 'All cars were found' })
  async findAll(): Promise<CarEntity[]> {
    return this.carsService.findAll();
  }

  @Get(':userId')
  @ApiOkResponse({ description: 'All cars were found by userId' })
  @ApiNotFoundResponse({ description: 'User not found by given userId' })
  @ApiParam({ name: 'userId', description: 'userId', required: true })
  async findAllByUserId(@Param('userId') userId: string): Promise<CarEntity[]> {
    return await this.carsService.findAllByUserId(userId);
  }

  @Get(':userId/:carId')
  @ApiOkResponse({ description: 'Car was found by userId and carId' })
  @ApiNotFoundResponse({ description: 'User with given userId was not found' })
  @ApiParam({ name: 'userId', description: 'userid', required: true })
  @ApiParam({ name: 'carId', description: 'carId', required: true })
  async findOneByUserId(
    @Param('userId') userId: string,
    @Param('carId') carId: string,
  ): Promise<CarEntity> {
    return this.carsService.findOneByUserId(userId, carId);
  }

  @Put(':userId/:carId')
  @ApiOkResponse({
    description: 'Car was successfully updated by userId and carId',
  })
  @ApiNotFoundResponse({
    description: 'User or car can not be found by userID or carId',
  })
  @ApiInternalServerErrorResponse({ description: 'Failed to update car' })
  @ApiParam({ name: 'userId', description: 'userId', required: true })
  @ApiParam({ name: 'carId', description: 'carId', required: true })
  @ApiBody({ type: CarDto })
  async updateCar(
    @Param('userId') userId: string,
    @Param('carId') carId: string,
    @Body() updateCarDto: CarDto,
  ): Promise<boolean> {
    await this.carsService.updateCar(userId, carId, updateCarDto);
    return true;
  }

  @Delete(':userId/:carId')
  @ApiOkResponse({
    description: 'Car was successfully removed by given userId and carId',
  })
  @ApiNotFoundResponse({
    description: 'User or car can not be found by userID or carId',
  })
  @ApiInternalServerErrorResponse({ description: 'Failed to update car' })
  @ApiParam({ name: 'userId', description: 'userId', required: true })
  @ApiParam({ name: 'carId', description: 'carId', required: true })
  async removeCar(
    @Param('userId') userId: string,
    @Param('carId') carId: string,
  ): Promise<boolean> {
    await this.carsService.remove(userId, carId);
    return true;
  }
}

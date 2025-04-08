import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CarDto } from './car.dto';
import { CarEntity } from './car.entity';
import { CarsService } from './cars.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ADDED_CAR_OK_RESPONSE_EXAMPLE,
  ALL_CARS_OK_RESPONSE_EXAMPLE,
} from './cars.swagger';

@ApiBearerAuth()
@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  @ApiOkResponse({
    description: 'Car was successfully created for userId',
    example: ADDED_CAR_OK_RESPONSE_EXAMPLE,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Car was not created' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiParam({ name: 'userId', description: 'User ID', required: true })
  @ApiBody({ type: CarDto })
  async createCar(
    @Param('userId') userId: string,
    @Body() createCarDto: CarDto,
  ): Promise<CarEntity> {
    const { user, ...car } = await this.carsService.createCar(
      userId,
      createCarDto,
    );
    return car as CarEntity;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':carId/user')
  @ApiOkResponse({ description: 'User id was found by carId', example: '1' })
  @ApiNotFoundResponse({ description: 'Car not found by given id' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiParam({ name: 'carId', description: 'carId', required: true })
  async getUserIdByCarId(@Param('carId') carId: string): Promise<string> {
    return await this.carsService.findUserIdByCarId(carId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({
    description: 'All cars were found',
    example: ALL_CARS_OK_RESPONSE_EXAMPLE,
  })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  async findAll(): Promise<CarEntity[]> {
    return this.carsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  @ApiOkResponse({
    description: 'All cars were found by userId',
    example: ALL_CARS_OK_RESPONSE_EXAMPLE,
  })
  @ApiNotFoundResponse({ description: 'User not found by given userId' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiParam({ name: 'userId', description: 'userId', required: true })
  async findAllByUserId(@Param('userId') userId: string): Promise<CarEntity[]> {
    return await this.carsService.findAllByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/:carId')
  @ApiOkResponse({
    description: 'Car was found by userId and carId',
    example: ALL_CARS_OK_RESPONSE_EXAMPLE,
  })
  @ApiNotFoundResponse({ description: 'User with given userId was not found' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiParam({ name: 'userId', description: 'userid', required: true })
  @ApiParam({ name: 'carId', description: 'carId', required: true })
  async findOneByUserId(
    @Param('userId') userId: string,
    @Param('carId') carId: string,
  ): Promise<CarEntity> {
    return this.carsService.findOneByUserId(userId, carId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId/:carId')
  @ApiOkResponse({
    description: 'Car was successfully updated by userId and carId',
    example: true,
  })
  @ApiNotFoundResponse({
    description: 'User or car can not be found by userID or carId',
  })
  @ApiInternalServerErrorResponse({ description: 'Failed to update car' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiParam({ name: 'userId', description: 'userId', required: true })
  @ApiParam({ name: 'carId', description: 'carId', required: true })
  @ApiBody({ type: CarDto })
  async updateCar(
    @Param('userId') userId: string,
    @Param('carId') carId: string,
    @Body() updateCarDto: CarDto,
  ): Promise<CarEntity> {
    return await this.carsService.updateCar(userId, carId, updateCarDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/:carId')
  @ApiOkResponse({
    description: 'Car was successfully removed by given userId and carId',
    example: true,
  })
  @ApiNotFoundResponse({
    description: 'User or car can not be found by userID or carId',
  })
  @ApiInternalServerErrorResponse({ description: 'Failed to update car' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
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

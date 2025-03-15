import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CarDto } from './car.dto';
import { CarEntity } from './car.entity';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carsRepository: Repository<CarEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createCar(userId: string, carDto: CarDto): Promise<CarEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const car: CarEntity = this.carsRepository.create({ user, ...carDto });

    try {
      return await this.carsRepository.save(car);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: 'Car was not created' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<CarEntity[]> {
    return await this.carsRepository.find();
  }

  async findAllByUserId(userId: string): Promise<CarEntity[]> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const cars: CarEntity[] = await this.carsRepository.find({
      where: { user: { id: userId } },
    });

    if (!cars.length) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'No cars found for this user',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return cars;
  }

  async findOneByUserId(userId: string, carId: string): Promise<CarEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const car: CarEntity = await this.carsRepository.findOne({
      where: { id: carId, user: { id: userId } },
    });

    if (!car) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Car not found or does not belong to the user',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return car;
  }

  async updateCar(
    userId: string,
    carId: string,
    updateCarDto: Partial<CarDto>,
  ): Promise<CarEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const car: CarEntity = await this.carsRepository.findOne({
      where: { id: carId, user: { id: userId } },
    });

    if (!car) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Car not found or does not belong to the user',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      return await this.carsRepository.save(Object.assign(car, updateCarDto));
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update car',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(userId: string, carId: string): Promise<DeleteResult> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const car: CarEntity = await this.carsRepository.findOne({
      where: { id: carId, user: { id: userId } },
    });

    if (!car) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Car not found or does not belong to the user',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      return await this.carsRepository.delete(carId);
    } catch (_) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete car',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

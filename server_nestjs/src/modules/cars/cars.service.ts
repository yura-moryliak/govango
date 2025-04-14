import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarDto } from './car.dto';
import { CarEntity } from './car.entity';
import { UserEntity } from '../users/user.entity';
import { CarImagesEntity } from './car-images.entity';
import { join } from 'path';
import { unlink } from 'node:fs';
import path from 'node:path';
import { ConfigService } from '@nestjs/config';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carsRepository: Repository<CarEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(CarImagesEntity)
    private readonly carImagesRepository: Repository<CarImagesEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createCar(userId: string, carDto: CarDto): Promise<CarEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const car: CarEntity = this.carsRepository.create({ user, ...carDto });

    try {
      return await this.carsRepository.save(car);
    } catch (error) {
      throw new HttpException('Car was not created', HttpStatus.BAD_REQUEST);
    }
  }

  async findUserIdByCarId(carId: string): Promise<string> {
    const car: CarEntity = await this.carsRepository.findOne({
      where: { id: carId },
      relations: ['user'],
      select: { user: { id: true } },
    });

    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return car.user.id;
  }

  async findAll(): Promise<CarEntity[]> {
    return await this.carsRepository.find();
  }

  async findAllByUserId(userId: string): Promise<CarEntity[]> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.carsRepository.find({
      where: { user: { id: userId } },
      relations: ['images'],
    });
  }

  async findOneByUserId(userId: string, carId: string): Promise<CarEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const car: CarEntity = await this.carsRepository.findOne({
      where: { id: carId, user: { id: userId } },
    });

    if (!car) {
      throw new HttpException(
        'Car not found or does not belong to the user',
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
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const car: CarEntity = await this.carsRepository.findOne({
      where: { id: carId, user: { id: userId } },
    });

    if (!car) {
      throw new HttpException(
        'Car not found or does not belong to the user',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      return await this.carsRepository.save(Object.assign(car, updateCarDto));
    } catch (error) {
      throw new HttpException(
        'Failed to update car',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadCarImages(
    carId: string,
    files: Express.Multer.File[],
  ): Promise<CarEntity> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const baseUrl: string = this.configService.get<string>('SERVER_BASE_URL');

    const car: CarEntity = await this.carsRepository.findOne({
      where: { id: carId },
      relations: ['images'],
    });

    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    for (const img of car.images) {
      const filePath = join(
        __dirname,
        '../../../../',
        'uploads',
        'cars',
        path.basename(img.imageUrl),
      );

      unlink(filePath, (err) => {
        if (err) {
          throw new HttpException(
            'Failed to delete old car image',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
    }

    await this.carImagesRepository.delete({ car: { id: car.id } });

    const images: CarImagesEntity[] = files.map((file) => {
      const image = new CarImagesEntity();
      image.car = car;
      image.imageUrl = `${baseUrl}/uploads/cars/${file.filename}`;
      return image;
    });

    await this.carImagesRepository.save(images);

    car.images = images;
    return instanceToPlain(car) as CarEntity;
  }

  async remove(userId: string, carId: string): Promise<string> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const car: CarEntity = await this.carsRepository.findOne({
      where: { id: carId, user: { id: userId } },
    });

    if (!car) {
      throw new HttpException(
        'Car not found or does not belong to the user',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await this.carsRepository.delete(carId);
      return car.id;
    } catch (_) {
      throw new HttpException(
        'Failed to delete car',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

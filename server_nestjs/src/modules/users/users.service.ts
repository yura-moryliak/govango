import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcryptjs from 'bcryptjs';
import { UserType } from './user-type.enum';
import { CarEntity } from '../cars/car.entity';
import { USER_ENTITY_PASSWORD_LESS_SELECT, UserEntity } from './user.entity';
import { CreateCarrierDto, CreateCustomerDto, UpdateUserDto } from './user.dto';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { unlink } from 'node:fs';
import { join } from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(CarEntity)
    private readonly carsRepository: Repository<CarEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    userLanguage: string,
  ): Promise<UserEntity> {
    const { phoneNumber, email, password } = createCustomerDto.userCredentials;

    const user: UserEntity = await this.usersRepository.findOne({
      where: [{ email }, { phoneNumber }],
    });

    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const salt: string = bcryptjs.genSaltSync(10);
    const encodedPassword: string = bcryptjs.hashSync(password, salt);
    const userEntity: UserEntity = this.usersRepository.create({
      ...createCustomerDto.userInfo,
      ...createCustomerDto.userCredentials,
      lang: userLanguage,
      password: encodedPassword,
    });
    return await this.usersRepository.save(userEntity);
  }

  async createCarrier(
    createCarrierDto: CreateCarrierDto,
    userLanguage: string,
  ): Promise<UserEntity> {
    const carrier: UserEntity = await this.createCustomer(
      createCarrierDto,
      userLanguage,
    );

    const { userCarInfo } = createCarrierDto;
    const car: CarEntity = this.carsRepository.create({
      ...userCarInfo,
      user: carrier,
    });
    await this.carsRepository.save(car);

    return carrier;
  }

  async findAll(userType: UserType): Promise<UserEntity[]> {
    if (!Object.values(UserType).includes(userType)) {
      throw new HttpException('Invalid user type', HttpStatus.BAD_REQUEST);
    }

    const whereCondition: FindOptionsWhere<UserEntity> | {} =
      userType === UserType.All
        ? {}
        : { isCarOwner: userType === UserType.Carrier };

    return await this.usersRepository.find({
      where: whereCondition,
      select: USER_ENTITY_PASSWORD_LESS_SELECT,
    });
  }

  async findOne(
    id: string,
    select: FindOptionsSelect<UserEntity> = USER_ENTITY_PASSWORD_LESS_SELECT,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: id },
      select: select,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(UserEntity, user);
  }

  async findInternalOne(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(UserEntity, user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(UserEntity, user);
  }

  async update(
    id: string,
    updateUserInfoDto: UpdateUserDto,
  ): Promise<UserEntity & UpdateUserDto> {
    const userEntity: UserEntity = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userEntity) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      return await this.usersRepository.save(
        Object.assign(userEntity, updateUserInfoDto),
      );
    } catch (_) {
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAvatar(
    id: string,
    fileName: string,
    avatarSource: 'google' | 'custom',
  ): Promise<UserEntity> {
    const baseUrl: string = this.configService.get<string>('SERVER_BASE_URL');
    const avatarUrl = `${baseUrl}/uploads/avatars/${fileName}`;

    const userEntity: UserEntity = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userEntity) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userEntity.avatar && userEntity.avatarSource === 'custom') {
      const oldAvatarPath = `${join(__dirname, '../../../../', 'uploads', 'avatars', path.basename(userEntity.avatar))}`;

      unlink(oldAvatarPath, (err) => {
        if (err) {
          throw new HttpException(
            'Failed to delete old avatar',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
    }

    userEntity.avatar = avatarUrl;
    userEntity.avatarSource = avatarSource;

    return this.usersRepository.save(userEntity);
  }

  async remove(id: string): Promise<DeleteResult> {
    const userEntity: UserEntity = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userEntity) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      return await this.usersRepository.delete(id);
    } catch (_) {
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

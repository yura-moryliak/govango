import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from './user.entity';
import { UserType } from './user-type.enum';
import { CarEntity } from '../cars/car.entity';
import { Encryption } from '../../utils/encryption';
import { CreateCarrierDto, CreateCustomerDto, UpdateUserDto } from './user.dto';

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
  ): Promise<UserEntity> {
    const { phoneNumber, email, password } = createCustomerDto.userCredentials;

    const user: UserEntity = await this.usersRepository.findOne({
      where: [{ email }, { phoneNumber }],
    });

    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const encodedPassword: string = Encryption.encode(
      password,
      this.configService.get('ENCRYPTION_CIPHER'),
    );

    const userEntity: UserEntity = this.usersRepository.create({
      ...createCustomerDto.userInfo,
      ...createCustomerDto.userCredentials,
      password: encodedPassword,
    });
    return await this.usersRepository.save(userEntity);
  }

  async createCarrier(createCarrierDto: CreateCarrierDto): Promise<UserEntity> {
    const carrier: UserEntity = await this.createCustomer(createCarrierDto);

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

    return await this.usersRepository.find({ where: whereCondition });
  }

  async findOne(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: id },
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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/user.dto';
import { Encryption } from '../../utils/encryption';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
    private readonly configService: ConfigService
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<UserEntity> {
    const { phoneNumber, email, password } = createCustomerDto.userCredentials;

    const user: UserEntity = await this.usersRepository.findOne({ where: [{ email }, { phoneNumber }] });

    if (user) {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'User already exist' }, HttpStatus.BAD_REQUEST);
    }

    const encodedPassword: string = Encryption.encode(password, this.configService.get('ENCRYPTION_CIPHER'));

    const userEntity: UserEntity = this.usersRepository.create({ ...createCustomerDto.userInfo, ...createCustomerDto.userCredentials, password: encodedPassword });
    return await this.usersRepository.save(userEntity);
  }

  async findOne(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(UserEntity, user);
  }
}

import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';

class UserInfoDto {
  @ApiProperty({
    description: 'Indicates whether the user is a carrier or not',
    default: false,
  })
  @IsBoolean()
  isCarOwner: boolean;

  @ApiProperty({
    description: 'First name of the user',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'City where the user lives',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  city: string;
}

class UserCredentialsDto {
  @ApiProperty({
    description: 'Mobile phone number of the user',
    default: '',
  })
  @IsString()
  @Matches(/^\+380\s\d{2}\s\d{7}$/)
  phoneNumber: string;

  @ApiProperty({
    description: 'Email of the user',
    default: '',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    default: '',
  })
  @IsString()
  @MinLength(7)
  password: string;
}

class UserCarInfoDto {
  @ApiProperty({
    description: 'Car registration plate',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  registrationPlate: string;

  @ApiProperty({
    description: 'Car make',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({
    description: 'Car model',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'Car length',
    default: 0,
  })
  @IsNumber()
  length: number;

  @ApiProperty({
    description: 'Car width',
    default: 0,
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    description: 'Car height',
    default: 0,
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    description: 'Car carry capacity',
    default: 0,
  })
  @IsNumber()
  carryCapacity: number;
}

class UpdateUser extends OmitType(UserInfoDto, ['isCarOwner'] as const) {}

export class CreateCustomerDto {
  @ApiProperty({ description: 'User general information' })
  @IsNotEmpty()
  userInfo: UserInfoDto;

  @ApiProperty({ description: 'User credentials', })
  @IsNotEmpty()
  userCredentials: UserCredentialsDto;
}

export class CreateCarrierDto {
  @ApiProperty({ description: 'User general information' })
  @IsNotEmpty()
  userInfo: UserInfoDto;

  @ApiProperty({ description: 'User credentials', })
  @IsNotEmpty()
  userCredentials: UserCredentialsDto;

  @ApiProperty({ description: 'Car information', })
  @IsNotEmpty()
  userCarInfo: UserCarInfoDto;
}

export class UpdateUserDto extends IntersectionType(UpdateUser, UserCredentialsDto) {}
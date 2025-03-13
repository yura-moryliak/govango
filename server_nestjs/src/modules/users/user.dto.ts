import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';

class UserInfoDto {
  @ApiProperty({
    description: 'Indicates whether the user is a carrier or not',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isCarOwner: boolean;

  @ApiProperty({
    description: 'First name of the user',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'City where the user lives',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;
}

class UserCredentialsDto {
  @ApiProperty({
    description: 'Mobile phone number of the user',
    default: '',
  })
  @IsString()
  @Matches(/^\+380\s\d{2}\s\d{7}$/)
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    description: 'Email of the user',
    default: '',
  })
  @IsEmail()
  @IsOptional()
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

class UpdateUser extends OmitType(UserInfoDto, ['isCarOwner'] as const) {}

class UpdateUserWithoutPassword extends OmitType(UserCredentialsDto, ['password'] as const) {}

export class UpdateUserDto extends IntersectionType(UpdateUser, UpdateUserWithoutPassword) {}
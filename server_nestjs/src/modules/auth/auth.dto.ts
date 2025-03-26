import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyCredentialsDto {
  @ApiProperty({
    description: 'Email',
    default: 'john_doe@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    default: '1234567',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class GoogleLoginDto {
  @ApiProperty({
    description: 'Google credential',
    default: 'google jwt credential token',
  })
  @IsString()
  @IsNotEmpty()
  idToken: string;
}

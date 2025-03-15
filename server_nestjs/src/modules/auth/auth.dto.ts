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

export class RefreshBodyCredentials {
  @ApiProperty({
    description: 'User ID',
    default: '1',
  })
  userId: string;

  @ApiProperty({
    description: 'Refresh token',
    default: 'refresh_token',
  })
  refreshToken: string;
}

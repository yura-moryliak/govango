import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CarDto {
  @ApiProperty({ description: 'Car registration plate' })
  @IsString()
  @IsNotEmpty()
  registrationPlate: string;

  @ApiProperty({ description: 'Car make' })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({ description: 'Car model' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ description: 'Car length' })
  @IsNumber()
  @IsNotEmpty()
  length: number;

  @ApiProperty({ description: 'Car width' })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({ description: 'Car height' })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({ description: 'Car carry capacity' })
  @IsNumber()
  @IsNotEmpty()
  carryCapacity: number;
}
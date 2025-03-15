import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CarDto {
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
  @IsNotEmpty()
  length: number;

  @ApiProperty({
    description: 'Car width',
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({
    description: 'Car height',
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({
    description: 'Car carry capacity',
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  carryCapacity: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CarDto {
  @ApiProperty({
    description: 'Car registration plate',
    default: 'AA1234AA',
  })
  @IsString()
  @IsNotEmpty()
  registrationPlate: string;

  @ApiProperty({
    description: 'Car make',
    default: 'Mercedes-Benz',
  })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({
    description: 'Car model',
    default: 'Sprinter',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'Car length',
    default: 5.5,
  })
  @IsNumber()
  @IsNotEmpty()
  length: number;

  @ApiProperty({
    description: 'Car width',
    default: 2.7,
  })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({
    description: 'Car height',
    default: 2.5,
  })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({
    description: 'Car carry capacity',
    default: 3.5,
  })
  @IsNumber()
  @IsNotEmpty()
  carryCapacity: number;
}

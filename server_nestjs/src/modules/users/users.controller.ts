import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CreateCarrierDto, CreateCustomerDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

export enum UserType {
  All = 'all',
  Customer = 'customer',
  Carrier = 'carrier',
}

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('customer')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<boolean> {
    await this.usersService.createCustomer(createCustomerDto);
    return true;
  }

  @Post('carrier')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  createCarrier(@Body() createCarrierDto: CreateCarrierDto) {
    return { message: `This action creates new carrier`, data: { createCarrierDto } };
  }

  @Get()
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiQuery({ name: 'type', enum: UserType, default: UserType.All })
  findAll(@Query('type') type: UserType = UserType.All) {
    return `This action returns all users of type: ${type}`;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findOne(@Param('id') id: string)  {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  updateUserInfo(@Param('id') id: string, @Body() updateUserInfoDto: UpdateUserDto) {
    return `This action updates user with id: ${id}`;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  remove(@Param('id') id: string) {
    return `This action deletes a customer with id: ${id}`;
  }
}

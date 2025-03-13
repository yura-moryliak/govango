import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CreateCarrierDto, CreateCustomerDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { UserType } from './user-type.enum';
import { UserEntity } from './user.entity';

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
  async createCarrier(@Body() createCarrierDto: CreateCarrierDto) {
    await this.usersService.createCarrier(createCarrierDto);
    return true;
  }

  @Get()
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiQuery({ name: 'userType', enum: UserType, required: true, example: UserType.All })
  async findAll(@Query('userType') userType: UserType = UserType.All): Promise<UserEntity[]> {
    return await this.usersService.findAll(userType);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findOne(@Param('id') id: string): Promise<UserEntity>  {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async updateUserInfo(@Param('id') id: string, @Body() updateUserInfoDto: UpdateUserDto): Promise<boolean> {
    await this.usersService.update(id, updateUserInfoDto);
    return true;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async remove(@Param('id') id: string): Promise<boolean> {
    await this.usersService.remove(id);
    return true;
  }
}

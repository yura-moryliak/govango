import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateCarrierDto, CreateCustomerDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { UserType } from './user-type.enum';
import { UserEntity } from './user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('customer')
  @ApiOkResponse({ description: 'New customer created successfully' })
  @ApiBadRequestResponse({ description: 'User already exist' })
  @ApiBody({ type: CreateCustomerDto })
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<boolean> {
    await this.usersService.createCustomer(createCustomerDto);
    return true;
  }

  @Post('carrier')
  @ApiOkResponse({ description: 'New carrier created successfully' })
  @ApiBadRequestResponse({ description: 'User already exist' })
  @ApiBody({ type: CreateCarrierDto })
  async createCarrier(
    @Body() createCarrierDto: CreateCarrierDto,
  ): Promise<boolean> {
    await this.usersService.createCarrier(createCarrierDto);
    return true;
  }

  @Get()
  @ApiOkResponse({ description: 'Users found by given user type' })
  @ApiBadRequestResponse({ description: 'Invalid user type' })
  @ApiQuery({
    name: 'userType',
    enum: UserType,
    required: true,
    example: UserType.All,
    description: 'User type',
  })
  async findAll(
    @Query('userType') userType: UserType = UserType.All,
  ): Promise<UserEntity[]> {
    return await this.usersService.findAll(userType);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User found by given id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'User updated successfully by given id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @ApiBody({ type: UpdateUserDto })
  async updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserInfoDto: UpdateUserDto,
  ): Promise<boolean> {
    await this.usersService.update(id, updateUserInfoDto);
    return true;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User removed successfully by given id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Failed to delete user' })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  async remove(@Param('id') id: string): Promise<boolean> {
    await this.usersService.remove(id);
    return true;
  }
}

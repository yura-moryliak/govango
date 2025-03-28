import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query, Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody, ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCarrierDto, CreateCustomerDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { UserType } from './user-type.enum';
import { UserEntity } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { USER_LIST_OK_RESPONSE_EXAMPLE } from './users.swagger';
import { Request } from 'express';

@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('customer')
  @ApiOkResponse({
    description: 'New customer created successfully',
    example: true,
  })
  @ApiBadRequestResponse({ description: 'User already exist' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiHeader({
    name: 'x-user-language',
    description: 'User current language',
    required: true,
  })
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @Req() req: Request,
  ): Promise<boolean> {
    const userLanguage = req.headers['x-user-language'] as string;
    await this.usersService.createCustomer(createCustomerDto, userLanguage);
    return true;
  }

  @Post('carrier')
  @ApiOkResponse({
    description: 'New carrier created successfully',
    example: true,
  })
  @ApiBadRequestResponse({ description: 'User already exist' })
  @ApiBody({ type: CreateCarrierDto })
  @ApiHeader({
    name: 'x-user-language',
    description: 'User current language',
    required: true,
  })
  async createCarrier(
    @Body() createCarrierDto: CreateCarrierDto,
    @Req() req: Request,
  ): Promise<boolean> {
    const userLanguage = req.headers['x-user-language'] as string;
    await this.usersService.createCarrier(createCarrierDto, userLanguage);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({
    description: 'Users found by given user type',
    example: USER_LIST_OK_RESPONSE_EXAMPLE,
  })
  @ApiBadRequestResponse({ description: 'Invalid user type' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({
    description: 'User found by given id',
    example: USER_LIST_OK_RESPONSE_EXAMPLE[0],
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOkResponse({
    description: 'User updated successfully by given id',
    example: true,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @ApiBody({ type: UpdateUserDto })
  async updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserInfoDto: UpdateUserDto,
  ): Promise<boolean> {
    await this.usersService.update(id, updateUserInfoDto);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({
    description: 'User removed successfully by given id',
    example: true,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Failed to delete user' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  async remove(@Param('id') id: string): Promise<boolean> {
    await this.usersService.remove(id);
    return true;
  }
}

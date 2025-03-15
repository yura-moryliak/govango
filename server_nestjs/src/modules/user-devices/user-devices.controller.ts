import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserDevicesService } from './user-devices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDevicesModule } from './user-devices.module';

@ApiBearerAuth()
@Controller()
export class UserDevicesController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ description: 'Get user devices' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  async getDevices(@Req() req: Request): Promise<UserDevicesModule> {
    return this.userDevicesService.getDevices(req.user as any);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':deviceId')
  @ApiOkResponse({ description: 'Delete certain device by deviceId' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  async removeDevice(
    @Req() req: Request,
    @Param('deviceId') deviceId: string,
  ): Promise<boolean> {
    await this.userDevicesService.removeDevice(req.user as any, deviceId);
    return true;
  }
}

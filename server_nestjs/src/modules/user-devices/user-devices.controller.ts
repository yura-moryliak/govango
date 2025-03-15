import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDevicesService } from './user-devices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDevicesModule } from './user-devices.module';

@ApiBearerAuth()
@Controller()
export class UserDevicesController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDevices(@Req() req: Request): Promise<UserDevicesModule> {
    return this.userDevicesService.getDevices(req.user as any);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':deviceId')
  async removeDevice(
    @Req() req,
    @Param('deviceId') deviceId: string,
  ): Promise<boolean> {
    await this.userDevicesService.removeDevice(req.user, deviceId);
    return true;
  }
}

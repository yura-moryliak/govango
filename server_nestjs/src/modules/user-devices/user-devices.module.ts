import { Module } from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { UserDevicesController } from './user-devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDeviceEntity } from './user-device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDeviceEntity])],
  exports: [UserDevicesService],
  providers: [UserDevicesService],
  controllers: [UserDevicesController],
})
export class UserDevicesModule {}

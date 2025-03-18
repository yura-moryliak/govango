import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { UserDeviceEntity } from './user-device.entity';

@Injectable()
export class UserDevicesService {
  constructor(
    @InjectRepository(UserDeviceEntity)
    private userDevicesRepository: Repository<UserDeviceEntity>,
  ) {}

  async registerDevice(
    user: UserEntity,
    ip: string,
    userAgent: string,
    refreshToken: string,
  ): Promise<UserDeviceEntity> {
    let existingDevice: UserDeviceEntity =
      await this.userDevicesRepository.findOne({
        where: { user, ip, userAgent },
      });

    if (existingDevice) {
      existingDevice.refreshToken = refreshToken;
      existingDevice.lastActiveAt = new Date();
      return this.userDevicesRepository.save(existingDevice);
    }

    const devices: UserDeviceEntity[] = await this.userDevicesRepository.find({
      where: { user },
    });

    if (devices.length >= 3) {
      const oldestDevice: UserDeviceEntity = devices.reduce(
        (prev: UserDeviceEntity, curr: UserDeviceEntity) =>
          prev.createdAt < curr.createdAt ? prev : curr,
      );
      await this.userDevicesRepository.delete(oldestDevice.id);
    }

    const newDevice: UserDeviceEntity = this.userDevicesRepository.create({
      user,
      ip,
      userAgent,
      refreshToken,
    });

    return this.userDevicesRepository.save(newDevice);
  }

  async getDevices(user: UserEntity): Promise<UserDeviceEntity[]> {
    return this.userDevicesRepository.find({
      where: { user },
      select: ['id', 'ip', 'userAgent', 'lastActiveAt', 'createdAt'],
    });
  }

  async removeDevice(
    user: UserEntity,
    deviceId: string,
  ): Promise<UserDeviceEntity> {
    const device: UserDeviceEntity = await this.userDevicesRepository.findOne({
      where: { id: deviceId, user },
    });
    if (!device) return null;
    return this.userDevicesRepository.remove(device);
  }

  async updateLastActive(deviceId: string): Promise<void> {
    await this.userDevicesRepository.update(deviceId, {
      lastActiveAt: new Date(),
    });
  }

  async findDeviceByToken(refreshToken: string): Promise<UserDeviceEntity> {
    return this.userDevicesRepository.findOne({
      where: { refreshToken },
      relations: ['user'],
    });
  }

  async removeDeviceByIpAndAgent(
    userId: string,
    ip: string,
    userAgent: string,
  ): Promise<boolean> {
    const device: UserDeviceEntity = await this.userDevicesRepository.findOne({
      where: { user: { id: userId }, ip, userAgent },
    });

    if (!device) {
      return false;
    }

    await this.userDevicesRepository.remove(device);
    return true;
  }

  async updateRefreshToken(
    userId: string,
    newRefreshToken: string,
  ): Promise<void> {
    await this.userDevicesRepository.update(
      { user: { id: userId } },
      { refreshToken: newRefreshToken },
    );
  }
}

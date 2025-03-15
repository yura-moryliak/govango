import { UserDeviceEntity } from './user-device.entity';

export const USER_DEVICE_OK_RESPONSE_EXAMPLE = new UserDeviceEntity();
USER_DEVICE_OK_RESPONSE_EXAMPLE.id = '123';
USER_DEVICE_OK_RESPONSE_EXAMPLE.ip = '127.0.0.1';
USER_DEVICE_OK_RESPONSE_EXAMPLE.userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36';
USER_DEVICE_OK_RESPONSE_EXAMPLE.refreshToken = 'refresh-token';
USER_DEVICE_OK_RESPONSE_EXAMPLE.createdAt = new Date('01-01-2025');
USER_DEVICE_OK_RESPONSE_EXAMPLE.lastActiveAt = new Date('01-01-2025');

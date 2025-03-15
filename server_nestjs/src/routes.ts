import { Routes } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CarsModule } from './modules/cars/cars.module';
import { UserDevicesModule } from './modules/user-devices/user-devices.module';

export const apiRoutes: Routes = [
  {
    path: '/api/auth',
    module: AuthModule,
  },
  {
    path: '/api/users',
    module: UsersModule,
  },
  {
    path: '/api/cars',
    module: CarsModule,
  },
  {
    path: '/api/user-devices',
    module: UserDevicesModule,
  },
];

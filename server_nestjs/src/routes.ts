import { Routes } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './modules/cars/cars.module';

export const apiRoutes: Routes = [
  {
    path: '/api/auth',
    module: AuthModule
  },
  {
    path: '/api/users',
    module: UsersModule
  },
  {
    path: '/api/cars',
    module: CarsModule
  }
];
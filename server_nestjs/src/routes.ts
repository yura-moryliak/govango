import { Routes } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

export const apiRoutes: Routes = [
  {
    path: '/api/auth',
    module: AuthModule
  },
  {
    path: '/api/users',
    module: UsersModule
  }
];
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  exports: [],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}

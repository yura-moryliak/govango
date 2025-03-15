import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './auth.dto';
import { UserEntity } from '../users/user.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginCredentialsDto) {
    const user: UserEntity = await this.authService.validateUser(
      body.email,
      body.password,
    );
    return this.authService.login(user);
  }
}

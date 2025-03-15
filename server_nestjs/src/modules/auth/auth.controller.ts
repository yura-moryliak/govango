import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserEntity } from '../users/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginBodyCredentialsDto, RefreshBodyCredentials } from './auth.dto';

@ApiBearerAuth()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ description: 'User logged in successfully' })
  @ApiBody({ type: LoginBodyCredentialsDto })
  async login(@Body() body: LoginBodyCredentialsDto) {
    const user: UserEntity = await this.authService.validateUser(
      body.email,
      body.password,
    );
    return this.authService.login(user);
  }

  @Post('refresh')
  @ApiOkResponse({ description: 'Refresh tokens generated successfully' })
  @ApiBody({ type: RefreshBodyCredentials })
  async refresh(@Body() body: RefreshBodyCredentials) {
    return this.authService.refreshTokens(body.userId, body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOkResponse({ description: 'User logged out successfully' })
  async logout(@Req() req: Request): Promise<boolean> {
    await this.authService.logout((req.user as any).userId);
    return true;
  }
}

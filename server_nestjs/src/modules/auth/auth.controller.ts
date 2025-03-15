import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginBodyCredentialsDto, RefreshBodyCredentialsDto } from './auth.dto';
import { LOGIN_OK_RESPONSE_EXAMPLE } from './auth.swagger';
import { UserEntity } from '../users/user.entity';

@ApiBearerAuth()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'User logged in successfully',
    example: LOGIN_OK_RESPONSE_EXAMPLE,
  })
  @ApiBody({ type: LoginBodyCredentialsDto })
  async login(
    @Body() body: LoginBodyCredentialsDto,
    @Req() req: Request,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const userAgent: string = req.headers['user-agent'] || 'Unknown';
    const ip: string = req.ip || 'Unknown';

    const user: UserEntity = await this.authService.validateUser(
      body.email,
      body.password,
    );
    return this.authService.login(user, ip, userAgent);
  }

  @Post('refresh')
  @ApiOkResponse({
    description: 'Refresh tokens generated successfully',
    example: LOGIN_OK_RESPONSE_EXAMPLE,
  })
  @ApiBody({ type: RefreshBodyCredentialsDto })
  async refresh(
    @Body() body: RefreshBodyCredentialsDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.refreshTokens(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOkResponse({ description: 'User logged out successfully', example: true })
  async logout(@Req() req: Request): Promise<boolean> {
    await this.authService.logout((req.user as any).userId, req);
    return true;
  }
}

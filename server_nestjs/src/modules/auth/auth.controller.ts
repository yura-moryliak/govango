import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginBodyCredentialsDto } from './auth.dto';
import { UserEntity } from '../users/user.entity';

@ApiBearerAuth()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'User logged in successfully',
    example: { access_token: 'access_token' },
  })
  @ApiBody({ type: LoginBodyCredentialsDto })
  async login(
    @Body() body: LoginBodyCredentialsDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const userAgent: string = req.headers['user-agent'] || 'Unknown';
    const ip: string = req.ip || 'Unknown';

    const user: UserEntity = await this.authService.validateUser(
      body.email,
      body.password,
    );
    const { access_token } = await this.authService.login(
      user,
      ip,
      userAgent,
      req,
      res,
    );
    res.json({ access_token });
  }

  @Post('refresh')
  @ApiOkResponse({
    description: 'Refresh tokens generated successfully',
    example: { access_token: 'access_token' },
  })
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { access_token } = await this.authService.refreshTokens(req, res);
    res.json({ access_token });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOkResponse({ description: 'User logged out successfully', example: true })
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.authService.logout((req.user as any).userId, req, res);
    res.send(true);
  }
}

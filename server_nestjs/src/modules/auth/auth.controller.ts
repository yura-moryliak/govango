import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
} from '@nestjs/swagger';
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
  @ApiHeader({
    name: 'x-fingerprint',
    description: 'Fingerprint of the device',
    required: true,
  })
  async login(
    @Body() body: LoginBodyCredentialsDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const fingerprint = req.headers['x-fingerprint'] as string;
    const user: UserEntity = await this.authService.validateUser(
      body.email,
      body.password,
    );
    const { access_token } = await this.authService.login(
      user,
      fingerprint,
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
  @ApiHeader({
    name: 'x-fingerprint',
    description: 'Fingerprint of the device',
    required: true,
  })
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    const fingerprint: string = req.headers['x-fingerprint'] as string;
    const { access_token } = await this.authService.refreshTokens(
      req,
      res,
      fingerprint,
    );

    res.json({ access_token });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOkResponse({ description: 'User logged out successfully', example: true })
  @ApiHeader({
    name: 'x-fingerprint',
    description: 'Fingerprint of the device',
    required: true,
  })
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const fingerprint: string = req.headers['x-fingerprint'] as string;
    await this.authService.logout(
      (req.user as any).userId,
      fingerprint,
      req,
      res,
    );

    res.send(true);
  }
}

import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserEntity } from '../users/user.entity';
import { PasswordResetService } from '../../common/services/password-reset.service';
import {
  ConfirmPasswordResetDto,
  GoogleLoginDto,
  LoginBodyCredentialsDto,
  PasswordResetRequestDto,
} from './auth.dto';

@ApiBearerAuth()
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly resetPasswordService: PasswordResetService,
  ) {}

  @Post('login')
  @ApiOkResponse({
    description: 'User logged in successfully',
    example: { access_token: 'access_token' },
  })
  @ApiBadRequestResponse({ description: 'User device fingerprint is missing' })
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
  @ApiBadRequestResponse({ description: 'User device fingerprint is missing' })
  @ApiUnauthorizedResponse({
    description: 'Refresh token has issues or user device is not found',
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

  @Post('logout')
  @ApiOkResponse({ description: 'User logged out successfully', example: true })
  @ApiBadRequestResponse({ description: 'User device fingerprint is missing' })
  @ApiHeader({
    name: 'x-fingerprint',
    description: 'Fingerprint of the device',
    required: true,
  })
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const fingerprint: string = req.headers['x-fingerprint'] as string;
    await this.authService.logout(fingerprint, req, res);

    res.send(true);
  }

  @Post('google-auth')
  @ApiOkResponse({
    description: 'User logged in successfully with Google Auth',
    example: { access_token: 'access_token' },
  })
  @ApiBadRequestResponse({ description: 'User device fingerprint is missing' })
  @ApiBody({ type: LoginBodyCredentialsDto })
  @ApiHeader({
    name: 'x-fingerprint',
    description: 'Fingerprint of the device',
    required: true,
  })
  @ApiBody({ type: GoogleLoginDto })
  async googleAuth(
    @Body() { idToken }: GoogleLoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const fingerprint = req.headers['x-fingerprint'] as string;
    const access_token = await this.authService.handleGoogleLogin(
      idToken,
      fingerprint,
      req,
      res,
    );
    res.json({ access_token });
  }

  @Post('reset-password/request')
  @ApiOkResponse({ description: 'Password reset request sent successfully' })
  @ApiBody({ type: PasswordResetRequestDto })
  async resetPassword(
    @Body() { email }: PasswordResetRequestDto,
  ): Promise<void> {
    await this.resetPasswordService.requestPasswordReset(email);
  }

  @Post('reset-password/confirm')
  @ApiOkResponse({ description: 'Password reset confirmed successfully' })
  @ApiBadRequestResponse({ description: 'Invalid or expired token' })
  @ApiBody({ type: ConfirmPasswordResetDto })
  async confirmPasswordReset(
    @Body() { token, newPassword }: ConfirmPasswordResetDto,
  ): Promise<void> {
    await this.resetPasswordService.confirmPasswordReset(token, newPassword);
  }
}

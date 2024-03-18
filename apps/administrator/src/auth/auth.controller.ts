import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateAdministratorDto } from '../dtos/create-administrator.dto';
import { AuthService } from './auth.service';
import { AdministratorService } from '../administrator.service';
import LocalAuthGuard from './guards/local-auth.guard';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { CurrentAdministrator } from '../decorators';
import { Administrator } from '../administrator.schema';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly administratorService: AdministratorService,
  ) {}

  @Post('/register')
  async register(@Body() request: CreateAdministratorDto) {
    return this.administratorService.createAdministrator(request);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentAdministrator() administrator: Administrator,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(administrator, response);
    response.send(administrator);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentAdministrator() administrator: Administrator) {
    return administrator;
  }
}

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
  private readonly logger = new Logger();

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
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  /*
  This code exection will start when it an event "validate_user" is emitted on the rmq service
  1. JwtAuthGuard invoke the JwtStrategy 
  2. get the "Authentication" from rpc or http request
  3. JwtStrategy will also validate the user in db and add the validated user in the current execution context.
  4. Then @CurrentAdministrator() gets invoked and get the user from current execution context and return the user to where "validate_user" event was invoked.
  */
  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')//this will check for event emitted on rmq server and then  call the validateUser() method Since, JwtAuthGuard is used as guards so JwtAuthGuard will be invoked first.
  //validateUser method will return the current user existed in CurrentAdministrator() custom decorator and this current user will be sent trough current execution context
  // to the pipe() method in canActivate() in JwtAuthGuard
  async validateUser(@CurrentAdministrator() administrator: Administrator) {
    return administrator;
  }
}

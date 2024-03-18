import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Administrator } from '../administrator.schema';
import { Response } from 'express';

export interface TokenPayload {
  administratorId: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(administrator: Administrator, response: Response) {
    this.logger.warn('++++ auth service... Login...', administrator ? JSON.stringify(administrator) : null);
    const tokenPayload: TokenPayload = {
      administratorId: administrator._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}

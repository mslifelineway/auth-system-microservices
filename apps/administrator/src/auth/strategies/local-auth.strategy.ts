import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdministratorService } from '../../administrator.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly administratorService: AdministratorService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return this.administratorService.validateAdministrator(email, password);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ObjectId } from 'mongodb';
import { AdministratorService } from '../../administrator.service';
import { TokenPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly administratorService: AdministratorService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ administratorId }: TokenPayload) {
    try {
      return await this.administratorService.getAdministrator({
        _id: ObjectId.createFromHexString(administratorId),
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

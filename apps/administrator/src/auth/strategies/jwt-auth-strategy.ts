import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ObjectId } from 'mongodb';
import { AdministratorService } from '../../administrator.service';
import { TokenPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger();

  constructor(
    configService: ConfigService,
    private readonly administratorService: AdministratorService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          this.logger.warn(
            '===> ExtractJwt',
            request?.Authentication,
            configService.get('JWT_SECRET'),
          );
          return request?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  //This method will validate and get the user and set the user to the current execution context of rpc (Rabbit MQ server)
  async validate(payload: TokenPayload) {
    const { administratorId } = payload;
    try {
      return await this.administratorService.getAdministrator({
        _id: administratorId as unknown as ObjectId
      });
    } catch (err) {
      throw new UnauthorizedException('You are not authorized.');
    }
  }
}

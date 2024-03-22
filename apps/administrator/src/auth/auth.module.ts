import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdministratorModule } from '../administrator.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { JwtStrategy } from './strategies/jwt-auth-strategy';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    RmqModule,
    forwardRef(() => AdministratorModule),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      }),
      envFilePath: './apps/administrator/.env',
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule1 {}

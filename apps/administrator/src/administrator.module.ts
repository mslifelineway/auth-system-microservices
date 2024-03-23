import { Module } from '@nestjs/common';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';
import {
  DatabaseModule,
  RmqModule,
  AuthMiddlewareModule,
  JwtAuthGuard,
} from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Administrator, AdministratorSchema } from './administrator.schema';
import { AdministratorRepository } from './administrator.repository';
import { ADMINISTRATOR_SERVICE } from './constants/services';
import { JwtStrategy } from './auth/strategies/jwt-auth-strategy';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_ADMINISTRATOR_QUEUE: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/administrator/.env',
    }),
    MongooseModule.forFeature([
      { name: Administrator.name, schema: AdministratorSchema },
    ]),
    RmqModule.register({
      name: ADMINISTRATOR_SERVICE,
    }),
    AuthModule,
    AuthMiddlewareModule,
  ],
  controllers: [AdministratorController],
  providers: [
    AdministratorService,
    AdministratorRepository,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AdministratorService],
})
export class AdministratorModule {}

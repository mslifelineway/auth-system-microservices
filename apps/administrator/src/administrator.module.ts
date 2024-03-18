import { Module } from '@nestjs/common';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Administrator, AdministratorSchema } from './administrator.schema';
import { AdministratorRepository } from './administrator.repository';

@Module({
  imports: [
    DatabaseModule,
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/administrator/.env',
    }),
    MongooseModule.forFeature([
      { name: Administrator.name, schema: AdministratorSchema },
    ]),
    AuthModule,
  ],
  controllers: [AdministratorController],
  providers: [AdministratorService, AdministratorRepository],
  exports: [AdministratorService]
})
export class AdministratorModule {}

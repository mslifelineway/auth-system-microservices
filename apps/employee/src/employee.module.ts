import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { DatabaseModule, AuthMiddlewareModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './employee.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EmployeeRepository } from './employee.repository';
import { EMPLOYEE_SERVICE } from './contants/services';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        // RABBIT_MQ_URI: Joi.string().required(),
        // RABBIT_MQ_EMPLOYEE_QUEUE: Joi.string().required(),
        // RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/employee/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    RmqModule.register({
      name: EMPLOYEE_SERVICE,
    }),
    AuthMiddlewareModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}

import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Employee } from './employee.schema';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EmployeeRepository extends AbstractRepository<Employee> {
  protected readonly logger = new Logger();

  constructor(
    @InjectModel(Employee.name) employeeModel: Model<Employee>,
    @InjectConnection() connection: Connection,
  ) {
    super(employeeModel, connection);
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  getHello(): string {
    return 'Hello World!';
  }
}

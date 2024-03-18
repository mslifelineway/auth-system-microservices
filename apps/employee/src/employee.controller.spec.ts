import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

describe('EmployeeController', () => {
  let employeeController: EmployeeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    employeeController = app.get<EmployeeController>(EmployeeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(employeeController.getHello()).toBe('Hello World!');
    });
  });
});

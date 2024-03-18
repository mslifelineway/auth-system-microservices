import { Test, TestingModule } from '@nestjs/testing';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';

describe('AdministratorController', () => {
  let administratorController: AdministratorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdministratorController],
      providers: [AdministratorService],
    }).compile();

    administratorController = app.get<AdministratorController>(AdministratorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(administratorController.getHello()).toBe('Hello World!');
    });
  });
});

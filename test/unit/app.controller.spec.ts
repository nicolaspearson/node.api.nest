import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Nest App"', () => {
      expect(appController.getInfo()).toBe('Nest App');
    });
  });
});

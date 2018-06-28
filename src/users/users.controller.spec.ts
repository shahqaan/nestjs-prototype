import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const usersController = app.get<UsersController>(UsersController);
      expect(usersController.root()).toBe('Hello World!');
    });
  });
});

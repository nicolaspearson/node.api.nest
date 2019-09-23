import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnvService } from '@app/env';

import User from '@app/entities/user.entity';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: EnvService.get().JWT_SECRET,
          signOptions: {
            expiresIn: EnvService.get().JWT_EXPIRATION,
          },
        }),
      ],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnvService } from '@app/env';

import User from '@app/entities/user.entity';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';

import { cookieUser, registerUserDto, user } from '../utils/fixtures';
import { MockType } from '../utils/test-types';

const userServiceMockFactory: () => MockType<UserService> = jest.fn(() => ({
  delete: jest.fn(() => user),
  findOneById: jest.fn(() => user),
  register: jest.fn(() => cookieUser),
})) as any;

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
        {
          provide: UserService,
          useFactory: userServiceMockFactory,
        },
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

  it('should return user upon successful registration', async () => {
    expect(await controller.registerUser(registerUserDto)).toMatchObject({
      cookie: expect.any(String),
      token: {
        accessToken: expect.any(String),
      },
      user,
    });
  });

  it('should return profile correctly', async () => {
    expect(await controller.getProfile({ user })).toMatchObject(user);
  });

  it('should return user upon successful deletion', async () => {
    expect(await controller.deleteUser(String(user.id))).toMatchObject(user);
  });
});

import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnvService } from '@app/env';

import User from '@app/entities/user.entity';
import { UserService } from '@app/user/user.service';

import { repositoryMockFactory } from '../utils/test-mocks';
import { MockType } from '../utils/test-types';

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: MockType<Repository<User>>;

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
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return for findAll', async () => {
    const user: User = {
      id: 1,
      firstName: 'Tony',
      lastName: 'Stark',
      emailAddress: 'tony.stark@avengers.com',
      password: 'secret',
      enabled: true,
    };
    repositoryMock.find.mockReturnValue([user]);
    expect(await service.findAll()).toEqual([user]);
  });
});

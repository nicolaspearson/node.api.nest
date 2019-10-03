import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnvService } from '@app/env';
import {
  BadRequestException,
  InternalException,
  UnauthorizedException,
} from '@app/exceptions';

import User from '@app/entities/user.entity';
import { UserService } from '@app/user/user.service';

import {
  loggedInUser,
  loginUserDto,
  registeredUser,
  registerUserDto,
  user,
} from '../utils/fixtures';
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

  describe('hooks', () => {
    it('preSaveHook should mutate user', () => {
      const saveUser = { ...user };
      expect(service.preSaveHook(saveUser));
      expect(saveUser).not.toEqual(user);
    });

    it('preUpdateHook should mutate user', () => {
      const updateUser = { ...user };
      expect(service.preUpdateHook(updateUser));
      expect(updateUser).not.toEqual(user);
    });

    it('preDeleteHook should mutate user', () => {
      const deleteUser = { ...user };
      expect(service.preDeleteHook(deleteUser));
      expect(deleteUser).not.toEqual(user);
    });

    it('preResultHook should mutate user', () => {
      const resultUser = { ...user };
      expect(service.preResultHook(resultUser));
      expect(resultUser).not.toEqual(user);
    });
  });

  describe('findOne', () => {
    it('returns undefined when not found', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      expect(await service.findOne(user.emailAddress)).toEqual(undefined);
    });

    it('returns user when found', async () => {
      repositoryMock.findOne.mockReturnValue(user);
      expect(await service.findOne(user.emailAddress)).toEqual(user);
    });
  });

  describe('register', () => {
    it('should throw if user is already registered', async () => {
      repositoryMock.findOne.mockReturnValue(registeredUser);
      await expect(service.register(registerUserDto)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw internal exception if another error occurs', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      repositoryMock.save.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(service.register(registerUserDto)).rejects.toThrowError(
        InternalException,
      );
    });

    it('returns cookie, token, and new user upon successful registration', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      repositoryMock.save.mockReturnValue(registeredUser);
      expect(await service.register(registerUserDto)).toMatchObject({
        cookie: expect.any(String),
        token: {
          accessToken: expect.any(String),
        },
        user: registeredUser,
      });
    });
  });

  describe('login', () => {
    it('should return undefined and throw if user does not exist', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      await expect(service.login(loginUserDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw if user does not exist', async () => {
      repositoryMock.findOne.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(service.login(loginUserDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw if user password is not valid', async () => {
      repositoryMock.findOne.mockReturnValue(user);
      await expect(service.login(loginUserDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw internal exception if another error occurs', async () => {
      repositoryMock.findOne.mockReturnValue({
        ...loggedInUser,
        password: undefined,
      });
      await expect(service.login(loginUserDto)).rejects.toThrowError(
        InternalException,
      );
    });

    it('returns cookie, token, and user upon successful login', async () => {
      repositoryMock.findOne.mockReturnValue(loggedInUser);
      expect(await service.login(loginUserDto)).toMatchObject({
        cookie: expect.any(String),
        token: {
          accessToken: expect.any(String),
        },
        user: loggedInUser,
      });
    });
  });
});

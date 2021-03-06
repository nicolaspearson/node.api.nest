import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { UserService } from '@app/user/user.service';

import { cookieUser } from '../utils/fixtures';
import { MockType } from '../utils/test-types';

const userServiceMockFactory: () => MockType<UserService> = jest.fn(() => ({
  login: jest.fn(() => cookieUser),
})) as any;

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserService,
          useFactory: userServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return cookie user upon successful login', async () => {
    const response = {
      setHeader: (header?: any) => header,
      status: (status?: number) => {
        return { send: (body?: any) => body, status };
      },
    };
    expect(await controller.login({ user: cookieUser }, response)).toEqual(
      cookieUser.token,
    );
  });
});

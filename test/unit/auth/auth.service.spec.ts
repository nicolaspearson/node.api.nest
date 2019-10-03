import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '@app/auth/auth.service';
import { UserService } from '@app/user/user.service';

import { cookieUser, user } from '../utils/fixtures';
import { MockType } from '../utils/test-types';

const loginMock = jest.fn(() => cookieUser);
const userServiceMockFactory: () => MockType<UserService> = jest.fn(() => ({
  login: loginMock,
})) as any;

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        AuthService,
        {
          provide: UserService,
          useFactory: userServiceMockFactory,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a cookie user if the credentials are valid', async () => {
    expect(
      await service.validateUser(user.emailAddress, user.password),
    ).toEqual(cookieUser);
  });

  it('should return undefined if the credentials are not valid', async () => {
    loginMock.mockImplementationOnce(() => undefined);
    expect(
      await service.validateUser(user.emailAddress, user.password),
    ).toEqual(undefined);
  });
});

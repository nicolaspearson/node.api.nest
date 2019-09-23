import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '@app/auth/auth.service';
import User from '@app/entities/user.entity';
import CookieUser from '@app/interfaces/cookie-user';
import { UserService } from '@app/user/user.service';

import { MockType } from '../utils/test-types';

const user: User = {
  id: 1,
  firstName: 'Tony',
  lastName: 'Stark',
  emailAddress: 'tony.stark@avengers.com',
  password: 'secret',
  enabled: true,
};
const cookieUser: CookieUser = {
  user,
  cookie: 'COOKIE',
  token: { accessToken: 'fakeAccessToken' },
};
const userServiceMockFactory: () => MockType<UserService> = jest.fn(() => ({
  login: jest.fn(() => cookieUser),
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

  it('should return for validateUser', async () => {
    expect(
      await service.validateUser(user.emailAddress, user.password),
    ).toEqual(cookieUser);
  });
});

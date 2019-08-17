import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '@app/auth/auth.service';
import { jwtConstants } from '@app/auth/constants';
import { UserModule } from '@app/user/user.module';
import { UserService } from '@app/user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: jwtConstants.secret,
          signOptions: {
            expiresIn: 3600,
          },
        }),
        UserModule,
      ],
      providers: [AuthService, UserService],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

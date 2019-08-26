import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from '@app/auth/auth.service';
import { jwtConstants } from '@app/auth/constants';
import { LocalStrategy } from '@app/auth/local.strategy';
import { UserModule } from '@app/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { JwtStrategy } from '@app/auth/jwt.strategy';
import { LocalStrategy } from '@app/auth/local.strategy';
import { EnvService } from '@app/env';
import { UserModule } from '@app/user/user.module';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: EnvService.get().JWT_SECRET,
      signOptions: { expiresIn: EnvService.get().JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { LocalStrategy } from '@app/auth/local.strategy';
import { UserModule } from '@app/user/user.module';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '@app/auth/jwt.strategy';
import User from '@app/entities/user.entity';
import { EnvService } from '@app/env';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';

@Module({
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: EnvService.get().JWT_SECRET,
      signOptions: { expiresIn: EnvService.get().JWT_EXPIRATION },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}

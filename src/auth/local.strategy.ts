import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@app/auth/auth.service';
import { UnauthorizedException } from '@app/exceptions';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super();
    this.logger.debug(`${LocalStrategy.name} has been initialized`);
  }

  async validate(emailAddress: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(emailAddress, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

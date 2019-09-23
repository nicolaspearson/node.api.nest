import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@app/auth/auth.service';
import { UnauthorizedException } from '@app/exceptions';
import CookieUser from '@app/interfaces/cookie-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'emailAddress', passwordField: 'password' });
    this.logger.debug(`${LocalStrategy.name} has been initialized`);
  }

  async validate(emailAddress: string, password: string): Promise<CookieUser> {
    const cookieUser:
      | CookieUser
      | undefined = await this.authService.validateUser(emailAddress, password);
    if (!cookieUser) {
      throw new UnauthorizedException();
    }
    return cookieUser;
  }
}

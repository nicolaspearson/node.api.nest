import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvService } from '@app/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: EnvService.get().JWT_SECRET,
    });
    this.logger.debug(`${JwtStrategy.name} has been initialized`);
  }

  async validate(
    payload: any,
  ): Promise<{
    userId: any;
    username: any;
  }> {
    return { userId: payload.sub, username: payload.username };
  }
}

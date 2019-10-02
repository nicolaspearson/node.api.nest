import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvService } from '@app/env';
import TokenPayload from '@app/interfaces/token-payload.interface';

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

  async validate(payload: TokenPayload): Promise<TokenPayload> {
    // If the token is valid simply pass on the payload.
    return payload;
  }
}

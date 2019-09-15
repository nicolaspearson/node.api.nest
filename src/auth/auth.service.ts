import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import LoginUserDto from '@app/dto/user.login.dto';
import CookieUser from '@app/interfaces/cookie-user';
import TokenPayload from '@app/interfaces/token-payload.interface';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.logger.debug(`${AuthService.name} has been initialized`);
  }

  async validateUser(emailAddress: string, password: string): Promise<any> {
    const loginUserDto = new LoginUserDto();
    loginUserDto.emailAddress = emailAddress;
    loginUserDto.password = password;
    const cookieUser: CookieUser = await this.userService.login(loginUserDto);
    if (cookieUser) {
      return cookieUser;
    }
    return null;
  }

  async login(user: any) {
    const payload: TokenPayload = { id: user.userId, email: user.emailAddress };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

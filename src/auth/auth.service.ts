import { Injectable, Logger } from '@nestjs/common';

import LoginUserDto from '@app/dto/user.login.dto';
import CookieUser from '@app/interfaces/cookie-user';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {
    this.logger.debug(`${AuthService.name} has been initialized`);
  }

  async validateUser(
    emailAddress: string,
    password: string,
  ): Promise<CookieUser | undefined> {
    // Validates the users credentials using the local strategy.
    const loginUserDto = new LoginUserDto();
    loginUserDto.emailAddress = emailAddress;
    loginUserDto.password = password;
    const cookieUser: CookieUser = await this.userService.login(loginUserDto);
    if (cookieUser) {
      return cookieUser;
    }
    return undefined;
  }
}

import {
  Controller,
  Injectable,
  Logger,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '@app/auth/auth.service';
import CookieUser from '@app/interfaces/cookie-user';

@Controller('/auth')
@Injectable()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {
    this.logger.debug(`${AuthController.name} has been initialized`);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Response() res) {
    const cookieUser: CookieUser = req.user;
    res.setHeader('Set-Cookie', [cookieUser.cookie]);
    return res.send(this.authService.login(cookieUser));
  }
}

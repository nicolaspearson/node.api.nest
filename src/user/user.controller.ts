import { Body, Controller, Injectable, Logger, Post } from '@nestjs/common';

import RegisterUserDto from '@app/dto/user.register.dto';
import { UserService } from './user.service';

@Controller('/user')
@Injectable()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {
    this.logger.debug(`${UserController.name} has been initialized`);
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }
}

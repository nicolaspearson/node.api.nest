import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOneById(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}

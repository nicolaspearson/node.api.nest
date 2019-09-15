import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(message?: string | object | any, error?: string) {
    super(
      {
        error: error || 'Unauthorized',
        message: message || 'Not enough privileges',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

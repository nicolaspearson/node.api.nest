import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(message?: string | object, error?: string) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: error || 'Unauthorized',
        message: message || 'Not enough privileges',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

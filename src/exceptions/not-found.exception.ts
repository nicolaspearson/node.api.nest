import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message?: string | object | any, error?: string) {
    super(
      {
        error: error || 'Not Found',
        message: message || 'Resource not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

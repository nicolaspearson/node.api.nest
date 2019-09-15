import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message?: string | object | any, error?: string) {
    super(
      {
        error: error || 'Bad Request',
        message: message || 'Invalid parameters supplied',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

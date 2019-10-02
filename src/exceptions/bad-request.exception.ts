import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message?: string | object, error?: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: error || 'Bad Request',
        message: message || 'Invalid parameters supplied',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

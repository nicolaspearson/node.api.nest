import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalException extends HttpException {
  constructor(message?: string | object, error?: string) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error || 'Internal Server Error',
        message: message || 'An internal server error occurred',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message?: string | object, error?: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: error || 'Not Found',
        message: message || 'Record not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

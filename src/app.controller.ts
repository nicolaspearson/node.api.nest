import { Controller, Get } from '@nestjs/common';

import { AppService } from '@app/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getInfo(): string {
    return this.appService.getInfo();
  }
}

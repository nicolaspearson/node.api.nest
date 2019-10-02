import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '@app/app.module';
import { EnvService } from '@app/env';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(EnvService.get().API_BASE_PATH);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get(`/${EnvService.get().API_BASE_PATH}/`)
      .expect(200)
      .expect('Nest App');
  });

  afterAll(async () => {
    await app.close();
  });
});

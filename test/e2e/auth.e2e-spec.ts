import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AuthModule } from '@app/auth/auth.module';
import { EnvService } from '@app/env';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(EnvService.get().API_BASE_PATH);
    await app.init();
  });

  it('/auth/login (POST) => invalid credentials', () => {
    return request(app.getHttpServer())
      .post(`/${EnvService.get().API_BASE_PATH}/auth/login`)
      .send('{"username": "invalid", "password": "invalid"}')
      .expect(401);
  });

  it('/auth/login (POST) => valid credentials', () => {
    return request(app.getHttpServer())
      .post(`/${EnvService.get().API_BASE_PATH}/auth/login`)
      .send('{"username": "john", "password": "change-me"}')
      .expect(200);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AuthModule } from '@app/auth/auth.module';

describe('AuthController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) => invalid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send('{"username": "invalid", "password": "user"}')
      .expect(401);
  });

  it('/auth/login (POST) => valid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send('{"username": "john", "password": "change-me"}')
      .expect(200);
  });
});

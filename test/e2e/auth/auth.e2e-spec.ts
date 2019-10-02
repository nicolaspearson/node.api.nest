import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { AppModule } from '@app/app.module';
import { AuthModule } from '@app/auth/auth.module';
import TypeOrmConfigService from '@app/db/config-service.db';
import { EnvService } from '@app/env';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
        }),
        AuthModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(EnvService.get().API_BASE_PATH);
    await app.init();
  });

  it('/auth/login (POST) => invalid credentials', () => {
    return request(app.getHttpServer())
      .post(`/${EnvService.get().API_BASE_PATH}/auth/login`)
      .send('{"emailAddress": "invalid", "password": "invalid"}')
      .expect(401);
  });

  it('/auth/login (POST) => valid credentials', async () => {
    const result = await request(app.getHttpServer())
      .post(`/${EnvService.get().API_BASE_PATH}/auth/login`)
      .send({ emailAddress: 'steve.rogers@avengers.com', password: 'secret' })
      .expect(200);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    expect(JSON.parse(result.text)).toEqual({
      accessToken: expect.any(String),
    });
    accessToken = JSON.parse(result.text).accessToken;
  });

  it('/me (GET)', async () => {
    const result = await request(app.getHttpServer())
      .get(`/${EnvService.get().API_BASE_PATH}/me`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    expect(JSON.parse(result.text)).toEqual({
      id: 1,
      email: 'steve.rogers@avengers.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { AppModule } from '@app/app.module';
import TypeOrmConfigService from '@app/db/config-service.db';
import User from '@app/entities/user.entity';
import { EnvService } from '@app/env';
import { UserModule } from '@app/user/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let user: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
        }),
        UserModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(EnvService.get().API_BASE_PATH);
    await app.init();
  });

  it('/user/register (POST)', async () => {
    const result = await request(app.getHttpServer())
      .post(`/${EnvService.get().API_BASE_PATH}/user/register`)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@test.com',
        password: 'secret',
      })
      .expect(201);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    expect(JSON.parse(result.text)).toEqual({
      cookie: expect.any(String),
      token: {
        accessToken: expect.any(String),
      },
      user: {
        id: expect.any(Number),
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@test.com',
        enabled: true,
      },
    });
    accessToken = JSON.parse(result.text).token.accessToken;
    user = JSON.parse(result.text).user;
  });

  it('/user/register (POST) => already registered', () => {
    return request(app.getHttpServer())
      .post(`/${EnvService.get().API_BASE_PATH}/user/register`)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@test.com',
        password: 'secret',
      })
      .expect(400);
  });

  it('/user/profile (GET) => invalid access token', () => {
    return request(app.getHttpServer())
      .get(`/${EnvService.get().API_BASE_PATH}/user/profile`)
      .set('Authorization', `Bearer invalid`)
      .expect(401);
  });

  it('/user/profile (GET)', async () => {
    const result = await request(app.getHttpServer())
      .get(`/${EnvService.get().API_BASE_PATH}/user/profile`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    expect(JSON.parse(result.text)).toEqual({
      id: expect.any(Number),
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@test.com',
      enabled: true,
    });
  });

  it('/user/:id (DELETE)', async () => {
    const result = await request(app.getHttpServer())
      .delete(`/${EnvService.get().API_BASE_PATH}/user/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    expect(JSON.parse(result.text)).toEqual({
      id: expect.any(Number),
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@test.com',
      enabled: true,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

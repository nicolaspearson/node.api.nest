import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { AppModule } from '@app/app.module';
import TypeOrmConfigService from '@app/db/config-service.db';
import Hero from '@app/entities/hero.entity';
import { EnvService } from '@app/env';
import { HeroModule } from '@app/hero/hero.module';

describe('HeroController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let hero: Hero;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
        }),
        HeroModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(EnvService.get().API_BASE_PATH);
    await app.init();
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

  it('/hero (POST)', async () => {
    const result = await request(app.getHttpServer())
      .post(`/${EnvService.get().API_BASE_PATH}/hero`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Iron Man',
        identity: 'Tony Stark',
        hometown: 'New York',
        age: 34,
      })
      .expect(201);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    const createdHero: Hero = JSON.parse(result.text);
    expect(createdHero).toEqual({
      id: expect.any(Number),
      name: 'Iron Man',
      identity: 'Tony Stark',
      hometown: 'New York',
      age: 34,
    });
    hero = createdHero;
  });

  it('/hero (GET)', async () => {
    const result = await request(app.getHttpServer())
      .get(`/${EnvService.get().API_BASE_PATH}/hero`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    const heroes: Hero[] = JSON.parse(result.text);
    expect(heroes.length).toBeGreaterThanOrEqual(1);
  });

  it('/hero (GET) => invalid access token', () => {
    request(app.getHttpServer())
      .get(`/${EnvService.get().API_BASE_PATH}/hero`)
      .set('Authorization', `Bearer invalid`)
      .expect(401);
  });

  it('/hero/:id (GET)', async () => {
    const result = await request(app.getHttpServer())
      .get(`/${EnvService.get().API_BASE_PATH}/hero/${hero.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    expect(JSON.parse(result.text)).toMatchObject(hero);
  });

  it('/hero/:id (GET) => invalid access token', () => {
    request(app.getHttpServer())
      .get(`/${EnvService.get().API_BASE_PATH}/hero/${hero.id}`)
      .set('Authorization', `Bearer invalid`)
      .expect(401);
  });

  it('/hero/:id (PUT)', async () => {
    const result = await request(app.getHttpServer())
      .put(`/${EnvService.get().API_BASE_PATH}/hero/${hero.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: hero.id,
        name: 'Hulk',
        identity: 'Bruce Banner',
        hometown: 'Chicago',
        age: 41,
      })
      .expect(200);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    const updatedHero: Hero = JSON.parse(result.text);
    expect(updatedHero).toMatchObject({
      id: hero.id,
      name: 'Hulk',
      identity: 'Bruce Banner',
      hometown: 'Chicago',
      age: 41,
    });
    hero = updatedHero;
  });

  it('/hero/:id (PUT) => invalid access token', () => {
    request(app.getHttpServer())
      .put(`/${EnvService.get().API_BASE_PATH}/hero/${hero.id}`)
      .set('Authorization', `Bearer invalid`)
      .expect(401);
  });

  it('/hero/:id (DELETE)', async () => {
    const result = await request(app.getHttpServer())
      .delete(`/${EnvService.get().API_BASE_PATH}/hero/${hero.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    const updatedHero: Hero = JSON.parse(result.text);
    expect(updatedHero).toMatchObject(updatedHero);
  });

  it('/hero/:id (DELETE) => invalid access token', () => {
    request(app.getHttpServer())
      .delete(`/${EnvService.get().API_BASE_PATH}/hero/${hero.id}`)
      .set('Authorization', `Bearer invalid`)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});

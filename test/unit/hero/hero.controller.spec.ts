import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Hero from '@app/entities/hero.entity';
import { HeroController } from '@app/hero/hero.controller';
import { HeroService } from '@app/hero/hero.service';

import {
  createHeroDto,
  heroOne,
  heroTwo,
  updateHeroDto,
} from '../utils/fixtures';
import { MockType } from '../utils/test-types';

const heroServiceMockFactory: () => MockType<HeroService> = jest.fn(() => ({
  deleteSoft: jest.fn(() => heroOne),
  findAll: jest.fn(() => [heroOne]),
  findOneById: jest.fn(() => heroOne),
  save: jest.fn(() => heroOne),
  update: jest.fn(() => heroTwo),
})) as any;

describe('Hero Controller', () => {
  let controller: HeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [
        {
          provide: HeroService,
          useFactory: heroServiceMockFactory,
        },
        {
          provide: getRepositoryToken(Hero),
          useValue: Repository,
        },
      ],
    }).compile();

    controller = module.get<HeroController>(HeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fetch heroes correctly', async () => {
    expect(await controller.getHeroes()).toMatchObject([heroOne]);
  });

  it('should fetch hero by id correctly', async () => {
    expect(await controller.getHeroById(String(heroOne.id))).toMatchObject(
      heroOne,
    );
  });

  it('should save hero correctly', async () => {
    expect(await controller.createHero(createHeroDto)).toMatchObject(heroOne);
  });

  it('should update hero correctly', async () => {
    expect(
      await controller.updateHero(String(updateHeroDto.id), updateHeroDto),
    ).toMatchObject(heroTwo);
  });

  it('should delete hero correctly', async () => {
    expect(await controller.deleteHero(String(heroOne.id))).toMatchObject(
      heroOne,
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Hero from '@app/entities/hero.entity';
import { HeroService } from '@app/hero/hero.service';

import { repositoryMockFactory } from '../utils/test-mocks';
import { MockType } from '../utils/test-types';

import { heroOne, heroTwo } from '../utils/fixtures';

describe('HeroService', () => {
  let service: HeroService;
  let repositoryMock: MockType<Repository<Hero>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroService,
        {
          provide: getRepositoryToken(Hero),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<HeroService>(HeroService);
    repositoryMock = module.get(getRepositoryToken(Hero));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hooks', () => {
    it('preSaveHook should mutate hero', () => {
      const saveHero = { ...heroOne };
      expect(service.preSaveHook(saveHero));
      expect(saveHero).not.toEqual(heroOne);
    });

    it('preUpdateHook should mutate hero', () => {
      const updateHero = { ...heroOne };
      expect(service.preUpdateHook(updateHero));
      expect(updateHero).not.toEqual(heroOne);
    });

    it('preDeleteHook should mutate hero', () => {
      const deleteHero = { ...heroOne };
      expect(service.preDeleteHook(deleteHero));
      expect(deleteHero).not.toEqual(heroOne);
    });

    it('preResultHook should mutate hero', () => {
      const resultHero = { ...heroOne };
      expect(service.preResultHook(resultHero));
      expect(resultHero).not.toEqual(heroOne);
    });
  });

  it('should return for findAll', async () => {
    repositoryMock.find.mockReturnValue([heroOne]);
    expect(await service.findAll()).toEqual([heroOne]);
  });

  it('should return for findOneById', async () => {
    repositoryMock.findOne.mockReturnValue(heroOne);
    expect(await service.findOneById(1)).toEqual(heroOne);
  });

  it('should return for delete', async () => {
    repositoryMock.findOne.mockReturnValue(heroOne);
    expect(await service.delete(1)).toEqual(heroOne);
  });

  it('should return for delete soft', async () => {
    repositoryMock.findOne.mockReturnValue(heroOne);
    expect(await service.deleteSoft(1)).toEqual(heroOne);
  });

  it('should return for save', async () => {
    repositoryMock.findOne.mockReturnValue(heroOne);
    expect(await service.save(heroOne)).toEqual(heroOne);
  });

  it('should return for update', async () => {
    repositoryMock.findOne.mockReturnValue(heroOne);
    expect(await service.save(heroTwo)).toEqual(heroTwo);
  });
});

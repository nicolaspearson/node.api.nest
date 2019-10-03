import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Hero from '@app/entities/hero.entity';
import { HeroService } from '@app/hero/hero.service';

import { repositoryMockFactory } from '../utils/test-mocks';
import { MockType } from '../utils/test-types';

const hero: Hero = {
  id: 1,
  name: 'Iron Man',
  identity: 'Tony Stark',
  hometown: 'New York',
  age: 35,
  deletedAt: null,
};

const anotherHero: Hero = {
  id: 1,
  name: 'Hulk',
  identity: 'Bruce Banner',
  hometown: 'Chicago',
  age: 41,
  deletedAt: null,
};

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

  it('should return for findAll', async () => {
    repositoryMock.find.mockReturnValue([hero]);
    expect(await service.findAll()).toEqual([hero]);
  });

  it('should return for findOneById', async () => {
    repositoryMock.findOne.mockReturnValue(hero);
    expect(await service.findOneById(1)).toEqual(hero);
  });

  it('should return for delete', async () => {
    repositoryMock.findOne.mockReturnValue(hero);
    expect(await service.delete(1)).toEqual(hero);
  });

  it('should return for delete soft', async () => {
    repositoryMock.findOne.mockReturnValue(hero);
    expect(await service.deleteSoft(1)).toEqual(hero);
  });

  it('should return for save', async () => {
    repositoryMock.findOne.mockReturnValue(hero);
    expect(await service.save(hero)).toEqual(hero);
  });

  it('should return for update', async () => {
    repositoryMock.findOne.mockReturnValue(hero);
    expect(await service.save(anotherHero)).toEqual(anotherHero);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Hero from '@app/entities/hero.entity';
import { HeroService } from '@app/hero/hero.service';

import { repositoryMockFactory } from '../utils/test-mocks';
import { MockType } from '../utils/test-types';

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
    const hero: Hero = {
      id: 1,
      name: 'Iron Man',
      identity: 'Tony Stark',
      hometown: 'New York',
      age: 35,
      deletedAt: null,
    };
    repositoryMock.find.mockReturnValue([hero]);
    expect(await service.findAll()).toEqual([hero]);
  });
});

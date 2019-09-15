import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Hero from '@app/entities/hero.entity';
import { HeroController } from '@app/hero/hero.controller';
import { HeroService } from '@app/hero/hero.service';

describe('Hero Controller', () => {
  let controller: HeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [
        HeroService,
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
});

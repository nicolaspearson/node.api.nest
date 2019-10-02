import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BaseService from '@app/base/base.service';
import Hero from '@app/entities/hero.entity';

@Injectable()
export class HeroService extends BaseService<Hero> {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ) {
    super(heroRepository);
  }

  public preSaveHook(hero: Hero): void {
    // Executed before the save repository call
    delete hero.id;
  }

  public preUpdateHook(hero: Hero) {
    // Executed before the update repository call
    delete hero.updatedAt;
  }

  public preDeleteHook(hero: Hero) {
    // Executed before the delete repository call
    hero.deletedAt = new Date();
  }

  public preResultHook(hero: Hero) {
    // Executed before the result is returned
    delete hero.createdAt;
    delete hero.deletedAt;
    delete hero.updatedAt;
  }
}

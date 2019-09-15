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
}

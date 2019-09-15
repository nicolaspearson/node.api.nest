import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Hero from '@app/entities/hero.entity';
import { HeroController } from '@app/hero/hero.controller';
import { HeroService } from '@app/hero/hero.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hero])],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import CreateHeroDto from '@app/dto/hero.create.dto';
import UpdateHeroDto from '@app/dto/hero.update.dto';
import { HeroService } from '@app/hero/hero.service';

@Controller('/hero')
@UseGuards(AuthGuard('jwt'))
@Injectable()
export class HeroController {
  private readonly logger = new Logger(HeroController.name);

  constructor(private readonly heroService: HeroService) {
    this.logger.debug(`${HeroController.name} has been initialized`);
  }

  @Get()
  getHeroes() {
    return this.heroService.findAll();
  }

  @Get(':id')
  getHeroById(@Param('id') id: string) {
    return this.heroService.findOneById(Number(id));
  }

  @Post()
  createHero(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.save(createHeroDto);
  }

  @Put(':id')
  updateHero(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(Number(id), updateHeroDto);
  }

  @Delete(':id')
  deleteHero(@Param('id') id: string) {
    return this.heroService.delete(Number(id));
  }
}

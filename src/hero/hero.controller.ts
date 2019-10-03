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
@Injectable()
export class HeroController {
  private readonly logger = new Logger(HeroController.name);

  constructor(private readonly heroService: HeroService) {
    this.logger.debug(`${HeroController.name} has been initialized`);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHeroes() {
    return this.heroService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getHeroById(@Param('id') id: string) {
    return this.heroService.findOneById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createHero(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.save(createHeroDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateHero(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(Number(id), updateHeroDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteHero(@Param('id') id: string) {
    return this.heroService.deleteSoft(Number(id));
  }
}

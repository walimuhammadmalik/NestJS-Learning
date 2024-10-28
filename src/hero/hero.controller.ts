import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HeroService } from './hero.service';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('hero')
@UseGuards(RolesGuard)
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Get()
  @Roles('Admin')
  findAllHeroes() {
    return this.heroService.findAll();
  }

  @Get(':id/movies')
  @Roles('Admin', 'Hero')
  findHeroMovies(@Param('id') heroId: string) {
    return this.heroService.findMoviesByHero(heroId);
  }
}
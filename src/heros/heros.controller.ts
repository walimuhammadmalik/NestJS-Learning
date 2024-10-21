import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { HerosService } from './heros.service';

@Controller('heros')
export class HerosController {
  heroModel: any;
  constructor(private herosService: HerosService) {}

  @Get('')
  getHeros() {
    return this.herosService.getHeros();
  }

  @Get(':id')
  getHero(@Param('id') id) {
    return this.herosService.getHero(id);
  }

  @Post('')
  createHero(@Body() hero) {
    return this.herosService.createHero(hero);
  }

  @Put(':id')
  updateHero(@Param('id') id, @Body() hero) {
    return this.herosService.updateHero(id, hero);
  }
  
  @Delete(':id')
  deleteHero(@Param('id') id) {
    return this.herosService.deleteHero(id);
  }
}

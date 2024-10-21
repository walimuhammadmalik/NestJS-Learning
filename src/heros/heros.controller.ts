import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HerosService } from './heros.service';

@Controller('heros')
export class HerosController {
  constructor(private herosService: HerosService) {}

  @Get('')
  async getHeros() {
    try {
      return await this.herosService.getHeros();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getHero(@Param('id') id) {
    try {
      return await this.herosService.getHero(id);
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('')
  async createHero(@Body() hero) {
    try {
      return await this.herosService.createHero(hero);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateHero(@Param('id') id, @Body() hero) {
    try {
      return await this.herosService.updateHero(id, hero);
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Delete(':id')
  async deleteHero(@Param('id') id) {
    try {
      return await this.herosService.deleteHero(id);
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

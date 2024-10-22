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
  Query,
} from '@nestjs/common';
import { HerosService } from './heros.service';
import { Types } from 'mongoose';

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

  @Get('search')
  async searchHeros(
    @Query()
    query: {
      name?: string;
      realName?: string;
      minAge?: number;
      maxAge?: number;
      age?: number;
    },
  ) {
    try {
      const { name, realName, minAge, maxAge, age } = query;

      if (minAge && isNaN(Number(minAge))) {
        throw new HttpException(
          'Invalid minAge parameter',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (age && isNaN(Number(age))) {
        throw new HttpException(
          'Invalid minAge parameter',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (maxAge && isNaN(Number(maxAge))) {
        throw new HttpException(
          'Invalid maxAge parameter',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (minAge && maxAge && Number(minAge) > Number(maxAge)) {
        throw new HttpException(
          'Minimum age cannot be greater than maximum age',
          HttpStatus.BAD_REQUEST,
        );
      }

      const searchResult = await this.herosService.searchHeros({
        name: name ? name.trim() : undefined,
        realName: realName ? realName.trim() : undefined,
        minAge: minAge ? Number(minAge) : undefined,
        maxAge: maxAge ? Number(maxAge) : undefined,
        age: age ? Number(age) : undefined,
      });

      return searchResult;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getHero(@Param('id') id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid hero ID', HttpStatus.BAD_REQUEST);
      }
      const hero = await this.herosService.getHero(id);
      if (!hero) {
        throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
      }
      return hero;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
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

  @Get('age/:minAge')
  async getHerosByMinAge(@Param('minAge') minAge: string) {
    try {
      const minAgeNumber = parseInt(minAge, 10);
      if (isNaN(minAgeNumber)) {
        throw new HttpException(
          'Invalid age parameter',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.herosService.getHerosByMinAge(minAgeNumber);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('age/:minAge/:maxAge')
  async getHerosByAgeRange(
    @Param('minAge') minAge: string,
    @Param('maxAge') maxAge: string,
  ) {
    try {
      const minAgeNumber = parseInt(minAge, 10);
      const maxAgeNumber = parseInt(maxAge, 10);

      if (isNaN(minAgeNumber) || isNaN(maxAgeNumber)) {
        throw new HttpException(
          'Invalid age parameters',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (minAgeNumber > maxAgeNumber) {
        throw new HttpException(
          'Minimum age cannot be greater than maximum age',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.herosService.getHerosByAgeRange(
        minAgeNumber,
        maxAgeNumber,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('realname/:realName')
  async searchHeroByRealName(@Param('realName') realName: string) {
    try {
      if (!realName || realName.trim() === '') {
        throw new HttpException(
          'Real name parameter is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.herosService.searchHeroByRealName(realName);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // start
  }
}

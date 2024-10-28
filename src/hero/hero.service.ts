import { Injectable } from '@nestjs/common';
import { Hero } from '../schemas/hero.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../schemas/movie.schema';

@Injectable()
export class HeroService {
  constructor(@InjectModel(Hero.name) private heroModel: Model<Hero>) {}

  async findAll(): Promise<Hero[]> {
    return this.heroModel.find().populate('movies').exec();
  }

  //create a new hero
  async create(hero: Hero): Promise<Hero> {
    return this.heroModel.create(hero);
  }

  async createHero(heroDetails) {
    try {
      //user email already exists

      const heroExists = await this.heroModel.findOne({
        email: heroDetails.email,
      });
      if (heroExists) {
        throw new Error('email already exists');
      }
      const hero = await this.heroModel.create(heroDetails);
      return hero;
    } catch (error) {
      throw new Error(`Failed to create hero: ${error.message}`);
    }
  }

  async findMoviesByHero(heroId: string): Promise<Movie[]> {
    const hero = await this.heroModel.findById(heroId).populate('movies').exec();
    return hero ? hero.movies : [];
  }
}
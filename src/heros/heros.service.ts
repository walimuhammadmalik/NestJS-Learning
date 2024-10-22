import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Hero from './schemas/hero.shema';

@Injectable()
export class HerosService {
  constructor(
    @InjectModel(Hero.name) private readonly heroModel: mongoose.Model<Hero>,
  ) {}

  async getHeros() {
    try {
      const heros = await this.heroModel.find();
      return heros;
    } catch (error) {
      throw new Error(`Failed to fetch heroes: ${error.message}`);
    }
  }

  async getHero(id?: any) {
    try {
      const hero = await this.heroModel.findById(id);
      if (!hero) {
        throw new NotFoundException(`Hero with ID ${id} not found`);
      }
      return hero;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch hero: ${error.message}`);
    }
  }

  async createHero(heroDetails) {
    try {
      const hero = await this.heroModel.create(heroDetails);
      return hero;
    } catch (error) {
      throw new Error(`Failed to create hero: ${error.message}`);
    }
  }

  async updateHero(id, hero) {
    try {
      const updatedHero = await this.heroModel.findByIdAndUpdate(id, hero, {
        new: true,
      });
      if (!updatedHero) {
        throw new NotFoundException(`Hero with ID ${id} not found`);
      }
      return updatedHero;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update hero: ${error.message}`);
    }
  }

  async deleteHero(id) {
    try {
      const hero = await this.heroModel.findByIdAndDelete(id);
      if (!hero) {
        throw new NotFoundException(`Hero with ID ${id} not found`);
      }
      return hero;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete hero: ${error.message}`);
    }
  }

  async getHerosByMinAge(minAge: number) {
    try {
      const heros = await this.heroModel.find({ age: { $gte: minAge } });
      return heros;
    } catch (error) {
      throw new Error(
        `Failed to fetch heroes by minimum age: ${error.message}`,
      );
    }
  }

  async getHerosByAgeRange(minAge: number, maxAge: number) {
    try {
      const heroes = await this.heroModel.find({
        age: { $gte: minAge, $lte: maxAge },
      });
      return heroes;
    } catch (error) {
      throw new Error(`Failed to fetch heroes by age range: ${error.message}`);
    }
  }
  async searchHeroByRealName(realName: string) {
    try {
      const heroes = await this.heroModel.find({
        realName: { $regex: realName, $options: 'i' },
      });
      return heroes;
    } catch (error) {
      throw new Error(`Failed to search heroes by real name: ${error.message}`);
    }
  }

  async searchHeros(params: {
    name?: string;
    realName?: string;
    minAge?: number;
    maxAge?: number;
    age?: number;
  }) {
    try {
      const query: any = {};

      if (params.name) {
        query.name = { $regex: params.name, $options: 'i' };
      }
      if (params.realName) {
        query.realName = { $regex: params.realName, $options: 'i' };
      }
      if (params.age !== undefined) {
        query.age = params.age;
      } else if (params.minAge !== undefined || params.maxAge !== undefined) {
        query.age = {};
        if (params.minAge !== undefined) {
          query.age.$gte = params.minAge;
        }
        if (params.maxAge !== undefined) {
          query.age.$lte = params.maxAge;
        }
      }

      const heroes = await this.heroModel.find(query);
      return heroes;
    } catch (error) {
      throw new Error(`Failed to search heroes: ${error.message}`);
    }
  }
}

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
}

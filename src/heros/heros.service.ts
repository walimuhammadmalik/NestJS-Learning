import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Hero from './schemas/hero.shema';

@Injectable()
export class HerosService {
  constructor(
    @InjectModel(Hero.name) private readonly heroModel: mongoose.Model<Hero>,
  ) {}

  async getHeros() {
    const heros = await this.heroModel.find();
    return heros;
  }

  async getHero(id?: any) {
    const hero = await this.heroModel.findById(id);
    return hero;
  }

  async createHero(heroDetails) {
    console.log(heroDetails);
    const hero = await this.heroModel.create(heroDetails);
    return hero;
  }

  async updateHero(id, hero) {
    const user = await this.heroModel.findByIdAndUpdate(id, hero, {
      new: true,
    });
    return user;
  }

  async deleteHero(id) {
    const hero = await this.heroModel.findByIdAndDelete(id);
    return hero;
  }
}
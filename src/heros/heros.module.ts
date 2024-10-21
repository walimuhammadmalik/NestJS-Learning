import { Module } from '@nestjs/common';
import { HerosController } from './heros.controller';
import { HerosService } from './heros.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { HeroSchema } from './schemas/hero.shema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Hero', schema: HeroSchema }])],
  controllers: [HerosController],
  providers: [HerosService],
})
export class HerosModule {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export default class Movie {
  @Prop()
  movieName: string;
  @Prop()
  heroName: string;
}

export const AdminSchema = SchemaFactory.createForClass(Movie);
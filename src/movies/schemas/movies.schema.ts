import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export default class Movie {
  @Prop()
  movieName: string;
  @Prop()
  heroName: string;
  @Prop()
  modiveDesc: string;
  Prop()
  modiveDate: string;
}

export const AdminSchema = SchemaFactory.createForClass(Movie);
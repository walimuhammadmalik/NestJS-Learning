import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export default class Hero {
  @Prop()
  name: string;
  @Prop()
  realName: string;
  @Prop()
  email: string;
  @Prop()
  isAvenger: boolean;
  @Prop()
  age: number;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
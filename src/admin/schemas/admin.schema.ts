import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export default class Admin {
  @Prop()
  adminName: string;
  @Prop()
  adminEmail: string;
  @Prop()
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TargetDocument = HydratedDocument<Target>;

@Schema({ timestamps: true })
export class Target {
  @Prop({ required: true })
  access_url: string;

  @Prop({ required: true })
  os: string;
}

export const TargetSchema = SchemaFactory.createForClass(Target);

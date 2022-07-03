import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop([String])
  tags: string[];

  @Prop()
  address: string;

  @Prop()
  virtual: boolean;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  createdBy: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
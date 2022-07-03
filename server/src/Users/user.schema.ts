import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventDocument } from 'src/Events/event.schema';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: "regular" })
  role: string;

  @Prop([Object])
  favourites: EventDocument[];

}

export const UserSchema = SchemaFactory.createForClass(User);
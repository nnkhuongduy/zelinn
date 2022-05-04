import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { List } from './list.schema';
import { User } from './user.schema';

export type CardDocument = Card & Document;

export const Card_STATES = ['ACTIVE', 'ARCHIVED'] as const;

export type CardState = typeof Card_STATES[number];

@Schema({ timestamps: true })
export class Card {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: User | MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'List' })
  list: List | MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  thumbnail: string;

  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
  })
  participants: User[] | MongooseSchema.Types.ObjectId[];

  @Prop()
  start: Date;

  @Prop()
  due: Date;

  @Prop({ default: Card_STATES[0], enum: Card_STATES })
  state: CardState;
}

export const CardSchema = SchemaFactory.createForClass(Card);

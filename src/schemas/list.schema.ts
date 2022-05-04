import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Board } from './board.schema';

export type ListDocument = List & Document;

export const LIST_STATES = ['ACTIVE', 'ARCHIVED'] as const;

export type ListState = typeof LIST_STATES[number];

@Schema({ timestamps: true })
export class List {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Board' })
  board: Board | MongooseSchema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ default: LIST_STATES[0], enum: LIST_STATES })
  state: ListState;
}

export const ListSchema = SchemaFactory.createForClass(List);

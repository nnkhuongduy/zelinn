import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  owner: MongooseSchema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  image: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);

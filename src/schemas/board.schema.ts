import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  owner: MongooseSchema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  image: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);

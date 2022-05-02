import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export const BOARD_PERMISSIONS = ['PUBLIC', 'PRIVATE'] as const;

export type BoardDocument = Board & Document;

export type BoardPermission = typeof BOARD_PERMISSIONS[number];

@Schema({ timestamps: true })
export class Board {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User | MongooseSchema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  thumbnail: string;

  @Prop({ default: BOARD_PERMISSIONS[0], enum: BOARD_PERMISSIONS })
  permission: BoardPermission;

  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
  })
  members: User[] | MongooseSchema.Types.ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);

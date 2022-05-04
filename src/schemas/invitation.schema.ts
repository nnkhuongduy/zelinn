import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Board } from './board.schema';
import { Notification } from './notification.schema';
import { User } from './user.schema';

export type InvitationDocument = Invitation & Document;

@Schema()
export class Invitation {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Notification' })
  notification: Notification | MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Board' })
  board: Board | MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User | MongooseSchema.Types.ObjectId;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop({ default: false })
  result: boolean;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);

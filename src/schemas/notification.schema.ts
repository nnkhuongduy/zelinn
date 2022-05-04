import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export const NOTIFICATION_TYPES = ['TEXT', 'BOARD_INVITATION'] as const;

export type NotificationDocument = Notification & Document;

export type NotificationType = typeof NOTIFICATION_TYPES[number];

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User | MongooseSchema.Types.ObjectId;

  @Prop({ default: false })
  seen: boolean;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  label: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;

  @Prop({
    default: NOTIFICATION_TYPES[0],
    enum: NOTIFICATION_TYPES,
  })
  type: NotificationPermission;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

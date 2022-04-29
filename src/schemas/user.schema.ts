import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Type, Transform, Exclude } from 'class-transformer';
import { Verification, VerificationSchema } from './verification.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  phone: string;

  @Prop()
  birth: Date;

  @Exclude()
  @Prop({ type: VerificationSchema })
  @Type(() => Verification)
  verification: Verification;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VerificationDocument = Verification & Document;

@Schema()
export class Verification {
  @Prop()
  code: string;

  @Prop()
  expireAt: Date;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);

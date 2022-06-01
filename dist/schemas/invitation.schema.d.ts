/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Board } from './board.schema';
import { Notification } from './notification.schema';
import { User } from './user.schema';
export declare type InvitationDocument = Invitation & Document;
export declare class Invitation {
    notification: Notification | MongooseSchema.Types.ObjectId;
    board: Board | MongooseSchema.Types.ObjectId;
    user: User | MongooseSchema.Types.ObjectId;
    confirmed: boolean;
    result: boolean;
}
export declare const InvitationSchema: MongooseSchema<Invitation, import("mongoose").Model<Invitation, any, any, any>, {}, {}>;

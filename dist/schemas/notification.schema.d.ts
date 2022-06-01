/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
export declare const NOTIFICATION_TYPES: readonly ["TEXT", "BOARD_INVITATION"];
export declare type NotificationDocument = Notification & Document;
export declare type NotificationType = typeof NOTIFICATION_TYPES[number];
export declare class Notification {
    user: User | MongooseSchema.Types.ObjectId;
    seen: boolean;
    title: string;
    label: string;
    description: string;
    icon: string;
    type: NotificationPermission;
}
export declare const NotificationSchema: MongooseSchema<Notification, import("mongoose").Model<Notification, any, any, any>, {}, {}>;

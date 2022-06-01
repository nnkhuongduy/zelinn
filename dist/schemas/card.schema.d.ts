/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document, Schema as MongooseSchema } from 'mongoose';
import { List } from './list.schema';
import { User } from './user.schema';
export declare type CardDocument = Card & Document;
export declare const CARD_STATES: readonly ["ACTIVE", "ARCHIVED"];
export declare type CardState = typeof CARD_STATES[number];
export declare class Card {
    createdBy: User | MongooseSchema.Types.ObjectId;
    list: List | MongooseSchema.Types.ObjectId;
    name: string;
    description: string;
    thumbnail: string;
    participants: User[] | MongooseSchema.Types.ObjectId[];
    start: Date;
    due: Date;
    completed: boolean;
    state: CardState;
}
export declare const CardSchema: MongooseSchema<Card, import("mongoose").Model<Card, any, any, any>, {}, {}>;

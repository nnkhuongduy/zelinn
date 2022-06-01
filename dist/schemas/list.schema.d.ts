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
export declare type ListDocument = List & Document;
export declare const LIST_STATES: readonly ["ACTIVE", "ARCHIVED"];
export declare type ListState = typeof LIST_STATES[number];
export declare class List {
    board: Board | MongooseSchema.Types.ObjectId;
    name: string;
    priority: number;
    state: ListState;
}
export declare const ListSchema: MongooseSchema<List, import("mongoose").Model<List, any, any, any>, {}, {}>;

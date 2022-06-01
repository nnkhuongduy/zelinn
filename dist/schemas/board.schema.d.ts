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
export declare const BOARD_PERMISSIONS: readonly ["PUBLIC", "PRIVATE"];
export declare const BOARD_STATES: readonly ["ACTIVE", "ARCHIVED"];
export declare type BoardDocument = Board & Document;
export declare type BoardPermission = typeof BOARD_PERMISSIONS[number];
export declare type BoardState = typeof BOARD_STATES[number];
export declare class Board {
    owner: User | MongooseSchema.Types.ObjectId;
    name: string;
    thumbnail: string;
    description: string;
    permission: BoardPermission;
    members: User[] | MongooseSchema.Types.ObjectId[];
    pending: User[] | MongooseSchema.Types.ObjectId[];
    state: BoardState;
}
export declare const BoardSchema: MongooseSchema<Board, import("mongoose").Model<Board, any, any, any>, {}, {}>;

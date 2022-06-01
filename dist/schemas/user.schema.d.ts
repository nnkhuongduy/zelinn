/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Verification } from './verification.schema';
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    name: string;
    phone: string;
    verification: Verification;
    avatar: string;
    favBoards: MongooseSchema.Types.ObjectId[];
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any>, {}, {}>;

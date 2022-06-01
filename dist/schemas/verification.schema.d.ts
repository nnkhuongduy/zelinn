/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type VerificationDocument = Verification & Document;
export declare class Verification {
    code: string;
    expireAt: Date;
}
export declare const VerificationSchema: import("mongoose").Schema<Verification, import("mongoose").Model<Verification, any, any, any>, {}, {}>;

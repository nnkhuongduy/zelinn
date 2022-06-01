/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserEditDto, UserFavBoardDto, UserRegisterDto } from './user.dto';
import { AuthService } from '../auth/auth.service';
export declare class UserService {
    private readonly userModel;
    private readonly authService;
    constructor(userModel: Model<UserDocument>, authService: AuthService);
    register({ name, phone, email, }: UserRegisterDto): Promise<UserDocument>;
    edit(id: string, { name, phone }: UserEditDto): Promise<UserDocument>;
    favBoard(userId: string, { id: boardId }: UserFavBoardDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}

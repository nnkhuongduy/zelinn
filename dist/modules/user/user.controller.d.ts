import { UserDocument } from 'src/schemas/user.schema';
import { UserEditDto, UserFavBoardDto, UserRegisterDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: UserRegisterDto): Promise<UserDocument>;
    edit(body: UserEditDto, req: any): Promise<UserDocument>;
    favBoard(body: UserFavBoardDto, req: any): Promise<UserDocument>;
}

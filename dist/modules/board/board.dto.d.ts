import { BoardPermission } from 'src/schemas/board.schema';
export declare class PostBoardDto {
    name: string;
    thumbnail: string;
    permission: BoardPermission;
}
export declare class UpdateBoardDto {
    id: string;
    name: string;
    thumbnail: string;
    permission: BoardPermission;
    owner: string;
    description: string;
}
export declare class QueryUserDto {
    board: string;
    query: string;
}
export declare class InviteDto {
    members: string[];
    board: string;
}
export declare class ResponseInviteDto {
    notification: string;
    result: boolean;
}
export declare class RemoveMembersDto {
    board: string;
    members: string[];
}
export declare class GetBoardDto {
    id: string;
}
export declare class LeaveBoardDto {
    board: string;
}
export declare class DeleteBoardDto {
    board: string;
}

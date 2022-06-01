import { InviteDto, PostBoardDto, QueryUserDto, RemoveMembersDto, ResponseInviteDto, UpdateBoardDto, GetBoardDto, LeaveBoardDto, DeleteBoardDto } from './board.dto';
import { BoardService } from './board.service';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    getBoards(req: any): Promise<{
        members: any;
        pending: any;
        faved: boolean;
    }[]>;
    getBoard(query: GetBoardDto, req: any): Promise<import("../../schemas/board.schema").BoardDocument>;
    createBoard(body: PostBoardDto, req: any): Promise<void>;
    updateBoard(body: UpdateBoardDto, req: any): Promise<void>;
    query(query: QueryUserDto, req: any): Promise<{
        pending: boolean;
    }[]>;
    invite(body: InviteDto, req: any): Promise<void>;
    responseInvitation(body: ResponseInviteDto, req: any): Promise<void>;
    removeMembers(body: RemoveMembersDto, req: any): Promise<void>;
    leaveBoard(body: LeaveBoardDto, req: any): Promise<void>;
    deleteBoard(req: any, query: DeleteBoardDto): Promise<void>;
}

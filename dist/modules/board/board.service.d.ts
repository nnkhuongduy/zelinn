import { Model } from 'mongoose';
import { OnModuleInit } from '@nestjs/common';
import { BoardDocument } from 'src/schemas/board.schema';
import { DeleteBoardDto, InviteDto, LeaveBoardDto, PostBoardDto, QueryUserDto, RemoveMembersDto, ResponseInviteDto, UpdateBoardDto } from './board.dto';
import { UserDocument } from 'src/schemas/user.schema';
import { NotificationDocument } from 'src/schemas/notification.schema';
import { InvitationDocument } from 'src/schemas/invitation.schema';
import { ListDocument } from 'src/schemas/list.schema';
export declare class BoardService implements OnModuleInit {
    private readonly boardModel;
    private readonly userModel;
    private readonly notificationModel;
    private readonly invitationModel;
    private readonly listModel;
    constructor(boardModel: Model<BoardDocument>, userModel: Model<UserDocument>, notificationModel: Model<NotificationDocument>, invitationModel: Model<InvitationDocument>, listModel: Model<ListDocument>);
    onModuleInit(): Promise<void>;
    getBoards(userId: string): Promise<{
        members: any;
        pending: any;
        faved: boolean;
    }[]>;
    getBoard(userId: string, boardId: string): Promise<BoardDocument>;
    createBoard(userId: string, { name, thumbnail, permission }: PostBoardDto): Promise<void>;
    updateBoard(userId: string, { id, name, permission, thumbnail, owner: ownerId, description, }: UpdateBoardDto): Promise<void>;
    queryUserToInvite(userId: string, { board: boardId, query }: QueryUserDto): Promise<{
        pending: boolean;
    }[]>;
    invite(ownerId: string, { members, board: boardId }: InviteDto): Promise<void>;
    responseInvitation(userId: string, { notification: notiId, result }: ResponseInviteDto): Promise<void>;
    removeMembers(userId: string, { board: boardId, members }: RemoveMembersDto): Promise<void>;
    leaveBoard(userId: string, { board: boardId }: LeaveBoardDto): Promise<void>;
    deleteBoard(userId: string, { board: boardId }: DeleteBoardDto): Promise<void>;
}

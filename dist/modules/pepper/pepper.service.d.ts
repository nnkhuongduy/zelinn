import { Model } from 'mongoose';
import { BoardDocument } from 'src/schemas/board.schema';
import { CardDocument } from 'src/schemas/card.schema';
import { ListDocument } from 'src/schemas/list.schema';
import { UserDocument } from 'src/schemas/user.schema';
export declare class PepperService {
    private readonly cardModel;
    private readonly boardModel;
    private readonly listModel;
    private readonly userModel;
    constructor(cardModel: Model<CardDocument>, boardModel: Model<BoardDocument>, listModel: Model<ListDocument>, userModel: Model<UserDocument>);
    getPepper(userId: string, date: string): Promise<any[]>;
}

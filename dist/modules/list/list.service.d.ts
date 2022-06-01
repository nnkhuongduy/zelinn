import { Model } from 'mongoose';
import { ListDocument } from 'src/schemas/list.schema';
import { BoardDocument } from 'src/schemas/board.schema';
import { CreateListDto, DeleteListDto, GetListDto, GetListsDto, UpdateListDto } from './list.dto';
import { CardDocument } from 'src/schemas/card.schema';
export declare class ListService {
    private readonly listModel;
    private readonly boardModel;
    private readonly cardModel;
    constructor(listModel: Model<ListDocument>, boardModel: Model<BoardDocument>, cardModel: Model<CardDocument>);
    getLists(userId: string, { board: boardId }: GetListsDto): Promise<any[]>;
    createList(userId: string, { board: boardId, name, priority }: CreateListDto): Promise<void>;
    getList(userId: string, { list: listId, card: cardId }: GetListDto): Promise<any>;
    updateList(userId: string, { id, name, priority }: UpdateListDto): Promise<void>;
    deleteList(userId: string, { list: listId }: DeleteListDto): Promise<void>;
}

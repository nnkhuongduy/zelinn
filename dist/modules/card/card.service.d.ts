/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from 'mongoose';
import { Card, CardDocument } from 'src/schemas/card.schema';
import { CompleteCardDto, CreateCardDto, DeleteCardDto, GetCardDto, GetCardsDto } from './card.dto';
import { BoardDocument } from 'src/schemas/board.schema';
import { ListDocument } from 'src/schemas/list.schema';
export declare class CardService {
    private readonly cardModel;
    private readonly boardModel;
    private readonly listModel;
    constructor(cardModel: Model<CardDocument>, boardModel: Model<BoardDocument>, listModel: Model<ListDocument>);
    createCard(userId: string, { list, name, description, start, due, participants }: CreateCardDto): Promise<void>;
    getCards(userId: string, { board: boardId, list: listId }: GetCardsDto): Promise<Omit<Card & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getCard(userId: string, { card: cardId }: GetCardDto): Promise<Card & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    completeCard(userId: string, { card: cardId }: CompleteCardDto): Promise<void>;
    deleteCard(userId: string, { card: cardId }: DeleteCardDto): Promise<void>;
}

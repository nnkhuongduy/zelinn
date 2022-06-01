/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { CompleteCardDto, CreateCardDto, GetCardDto, GetCardsDto, DeleteCardDto } from './card.dto';
import { CardService } from './card.service';
export declare class CardController {
    private readonly cardService;
    constructor(cardService: CardService);
    createCard(body: CreateCardDto, req: any): Promise<void>;
    getCards(query: GetCardsDto, req: any): Promise<Omit<import("../../schemas/card.schema").Card & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getCard(req: any, query: GetCardDto): Promise<import("../../schemas/card.schema").Card & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    completeCard(req: any, body: CompleteCardDto): Promise<void>;
    deleteCard(req: any, query: DeleteCardDto): Promise<void>;
}

export declare class CreateCardDto {
    list: string;
    name: string;
    description: string;
    start: Date;
    due: Date;
    participants: string[];
}
export declare class GetCardsDto {
    board: string;
    list: string;
}
export declare class GetCardDto {
    card: string;
}
export declare class CompleteCardDto {
    card: string;
}
export declare class DeleteCardDto {
    card: string;
}

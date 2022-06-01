"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const card_schema_1 = require("../../schemas/card.schema");
const board_schema_1 = require("../../schemas/board.schema");
const list_schema_1 = require("../../schemas/list.schema");
let CardService = class CardService {
    constructor(cardModel, boardModel, listModel) {
        this.cardModel = cardModel;
        this.boardModel = boardModel;
        this.listModel = listModel;
    }
    async createCard(userId, { list, name, description, start, due, participants }) {
        await this.cardModel.create({
            createdBy: userId,
            list,
            name,
            description,
            start,
            due,
            participants,
        });
    }
    async getCards(userId, { board: boardId, list: listId }) {
        if (boardId) {
            const board = await this.boardModel.findOne({
                _id: boardId,
                state: board_schema_1.BOARD_STATES[0],
            });
            const lists = await this.listModel
                .find({ board: board._id, state: list_schema_1.LIST_STATES[0] })
                .sort({ priority: 1, name: 1 });
            return await this.cardModel
                .find({ list: { $in: lists.map(({ _id }) => _id) } })
                .populate({ path: 'participants', select: '_id name avatar' });
        }
        if (listId) {
            return await this.cardModel
                .find({ list: listId, state: card_schema_1.CARD_STATES[0] })
                .populate({ path: 'participants', select: '_id name avatar' });
        }
        return await this.cardModel
            .find({ createdBy: userId, state: card_schema_1.CARD_STATES[0] })
            .populate({ path: 'participants', select: '_id name avatar' });
    }
    async getCard(userId, { card: cardId }) {
        const card = await this.cardModel
            .findOne({
            _id: cardId,
            state: card_schema_1.CARD_STATES[0],
        })
            .populate({ path: 'participants', select: '_id name avatar' })
            .select('-state');
        if (!card)
            throw new common_1.NotFoundException('Card not found!');
        const list = await this.listModel.findOne({
            _id: card.list,
            state: list_schema_1.LIST_STATES[0],
        });
        if (!list)
            throw new common_1.NotFoundException('List not found!');
        const board = await this.boardModel.findOne({
            _id: list.board,
            state: board_schema_1.BOARD_STATES[0],
            members: userId,
        });
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        card.thumbnail = card.thumbnail || board.thumbnail;
        return card;
    }
    async completeCard(userId, { card: cardId }) {
        const card = await this.cardModel.findOne({
            _id: cardId,
            state: card_schema_1.CARD_STATES[0],
        });
        if (!card)
            throw new common_1.NotFoundException('Card not found!');
        const list = await this.listModel.findOne({
            _id: card.list,
            state: list_schema_1.LIST_STATES[0],
        });
        if (!list)
            throw new common_1.NotFoundException('List not found!');
        const board = await this.boardModel.findOne({
            _id: list.board,
            state: board_schema_1.BOARD_STATES[0],
            members: userId,
        });
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        card.completed = !card.completed;
        await card.save();
    }
    async deleteCard(userId, { card: cardId }) {
        const card = await this.cardModel.findOne({
            _id: cardId,
            state: card_schema_1.CARD_STATES[0],
        });
        if (!card)
            throw new common_1.NotFoundException('Card not found!');
        const list = await this.listModel.findOne({
            _id: card.list,
            state: list_schema_1.LIST_STATES[0],
        });
        if (!list)
            throw new common_1.NotFoundException('List not found!');
        const board = await this.boardModel.findOne({
            _id: list.board,
            state: board_schema_1.BOARD_STATES[0],
            members: userId,
        });
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        card.state = card_schema_1.CARD_STATES[1];
        await card.save();
    }
};
CardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(card_schema_1.Card.name)),
    __param(1, (0, mongoose_2.InjectModel)(board_schema_1.Board.name)),
    __param(2, (0, mongoose_2.InjectModel)(list_schema_1.List.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], CardService);
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map
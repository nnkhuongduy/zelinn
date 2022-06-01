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
exports.ListService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const list_schema_1 = require("../../schemas/list.schema");
const board_schema_1 = require("../../schemas/board.schema");
const card_schema_1 = require("../../schemas/card.schema");
let ListService = class ListService {
    constructor(listModel, boardModel, cardModel) {
        this.listModel = listModel;
        this.boardModel = boardModel;
        this.cardModel = cardModel;
    }
    async getLists(userId, { board: boardId }) {
        const board = await this.boardModel.findOne({
            _id: boardId,
            state: board_schema_1.BOARD_STATES[0],
            members: userId,
        });
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        const lists = await this.listModel
            .find({
            board: board._id,
            state: list_schema_1.LIST_STATES[0],
        })
            .sort({ priority: 1, name: 1 });
        const result = [];
        for (const list of lists) {
            const cards = await this.cardModel
                .find({
                list: list._id,
                state: card_schema_1.CARD_STATES[0],
            })
                .sort('due')
                .populate({ path: 'participants', select: '_id name avatar' });
            result.push(Object.assign(Object.assign({}, list.toJSON()), { cards: [
                    ...cards.filter(({ completed }) => !completed),
                    ...cards.filter(({ completed }) => completed),
                ] }));
        }
        return result;
    }
    async createList(userId, { board: boardId, name, priority }) {
        const board = await this.boardModel.findById(boardId);
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        const isMember = board.members.findIndex((id) => id.toString() === userId) !== -1;
        if (!isMember)
            throw new common_1.BadRequestException('Not a member');
        await this.listModel.create({
            board: boardId,
            name,
            priority,
        });
    }
    async getList(userId, { list: listId, card: cardId }) {
        let list = null;
        if (listId)
            list = await this.listModel.findOne({
                _id: listId,
                state: list_schema_1.LIST_STATES[0],
            });
        if (cardId) {
            const card = await this.cardModel.findOne({
                _id: cardId,
                state: card_schema_1.CARD_STATES[0],
            });
            list = await this.listModel.findOne({
                _id: card.list,
                state: list_schema_1.LIST_STATES[0],
            });
        }
        if (!list)
            throw new common_1.NotFoundException('List not found!');
        const board = await this.boardModel.findOne({
            _id: list.board,
            state: board_schema_1.BOARD_STATES[0],
            members: userId,
        });
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        return list;
    }
    async updateList(userId, { id, name, priority }) {
        const list = await this.listModel.findOne({
            _id: id,
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
        list.name = name;
        list.priority = priority;
        await list.save();
    }
    async deleteList(userId, { list: listId }) {
        const list = await this.listModel.findOne({
            _id: listId,
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
        list.state = list_schema_1.LIST_STATES[1];
        await list.save();
        await this.cardModel.updateMany({ list: list._id }, {
            state: list_schema_1.LIST_STATES[1],
        });
    }
};
ListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(list_schema_1.List.name)),
    __param(1, (0, mongoose_2.InjectModel)(board_schema_1.Board.name)),
    __param(2, (0, mongoose_2.InjectModel)(card_schema_1.Card.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], ListService);
exports.ListService = ListService;
//# sourceMappingURL=list.service.js.map
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
exports.PepperService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const board_schema_1 = require("../../schemas/board.schema");
const card_schema_1 = require("../../schemas/card.schema");
const list_schema_1 = require("../../schemas/list.schema");
const user_schema_1 = require("../../schemas/user.schema");
let PepperService = class PepperService {
    constructor(cardModel, boardModel, listModel, userModel) {
        this.cardModel = cardModel;
        this.boardModel = boardModel;
        this.listModel = listModel;
        this.userModel = userModel;
    }
    async getPepper(userId, date) {
        const result = [];
        let boards = await this.boardModel
            .find({ members: userId })
            .select('_id name');
        const user = await this.userModel.findById(userId);
        boards = [
            ...boards.filter(({ _id }) => user.favBoards.includes(_id)),
            ...boards.filter(({ _id }) => !user.favBoards.includes(_id)),
        ];
        for (const board of boards) {
            const resultLists = [];
            const lists = await this.listModel
                .find({
                board: board._id,
                state: list_schema_1.LIST_STATES[0],
            })
                .sort({ priority: 1, name: 1 });
            for (const list of lists) {
                const cards = await this.cardModel
                    .find({
                    list: list._id,
                    state: card_schema_1.CARD_STATES[0],
                    participants: userId,
                    start: { $lte: date },
                    due: { $gte: date },
                })
                    .sort('due')
                    .populate({ path: 'participants', select: '_id avatar name' });
                if (cards.length)
                    resultLists.push({
                        name: list.name,
                        priorty: list.priority,
                        cards: [
                            ...cards.filter(({ completed }) => !completed),
                            ...cards.filter(({ completed }) => completed),
                        ],
                    });
            }
            if (resultLists.length)
                result.push(Object.assign(Object.assign({}, board.toJSON()), { faved: user.favBoards.includes(board._id), lists: resultLists }));
        }
        return result;
    }
};
PepperService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(card_schema_1.Card.name)),
    __param(1, (0, mongoose_2.InjectModel)(board_schema_1.Board.name)),
    __param(2, (0, mongoose_2.InjectModel)(list_schema_1.List.name)),
    __param(3, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], PepperService);
exports.PepperService = PepperService;
//# sourceMappingURL=pepper.service.js.map
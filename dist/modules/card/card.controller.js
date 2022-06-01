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
exports.CardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const card_dto_1 = require("./card.dto");
const card_service_1 = require("./card.service");
let CardController = class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    async createCard(body, req) {
        const { _id } = req.user;
        await this.cardService.createCard(_id, body);
    }
    async getCards(query, req) {
        const { _id } = req.user;
        return await this.cardService.getCards(_id, query);
    }
    async getCard(req, query) {
        const { _id } = req.user;
        const result = await this.cardService.getCard(_id, query);
        return result;
    }
    async completeCard(req, body) {
        const { _id } = req.user;
        await this.cardService.completeCard(_id, body);
    }
    async deleteCard(req, query) {
        const { _id } = req.user;
        await this.cardService.deleteCard(_id, query);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [card_dto_1.CreateCardDto, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "createCard", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [card_dto_1.GetCardsDto, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "getCards", null);
__decorate([
    (0, common_1.Get)('card'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, card_dto_1.GetCardDto]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "getCard", null);
__decorate([
    (0, common_1.Post)('complete'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, card_dto_1.CompleteCardDto]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "completeCard", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, card_dto_1.DeleteCardDto]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "deleteCard", null);
CardController = __decorate([
    (0, common_1.Controller)('cards'),
    __metadata("design:paramtypes", [card_service_1.CardService])
], CardController);
exports.CardController = CardController;
//# sourceMappingURL=card.controller.js.map
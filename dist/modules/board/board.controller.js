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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const board_dto_1 = require("./board.dto");
const board_service_1 = require("./board.service");
let BoardController = class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    async getBoards(req) {
        const { _id } = req.user;
        return await this.boardService.getBoards(_id);
    }
    async getBoard(query, req) {
        const { _id } = req.user;
        return await this.boardService.getBoard(_id, query.id);
    }
    async createBoard(body, req) {
        const { _id } = req.user;
        await this.boardService.createBoard(_id, body);
    }
    async updateBoard(body, req) {
        const { _id } = req.user;
        await this.boardService.updateBoard(_id, body);
    }
    async query(query, req) {
        const { _id } = req.user;
        return await this.boardService.queryUserToInvite(_id, query);
    }
    async invite(body, req) {
        const { _id } = req.user;
        await this.boardService.invite(_id, body);
    }
    async responseInvitation(body, req) {
        const { _id } = req.user;
        await this.boardService.responseInvitation(_id, body);
    }
    async removeMembers(body, req) {
        const { _id } = req.user;
        await this.boardService.removeMembers(_id, body);
    }
    async leaveBoard(body, req) {
        const { _id } = req.user;
        await this.boardService.leaveBoard(_id, body);
    }
    async deleteBoard(req, query) {
        const { _id } = req.user;
        await this.boardService.deleteBoard(_id, query);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "getBoards", null);
__decorate([
    (0, common_1.Get)('/board'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.GetBoardDto, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "getBoard", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.PostBoardDto, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.UpdateBoardDto, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "updateBoard", null);
__decorate([
    (0, common_1.Post)('members/query'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.QueryUserDto, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "query", null);
__decorate([
    (0, common_1.Post)('invite'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.InviteDto, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "invite", null);
__decorate([
    (0, common_1.Post)('invite/response'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.ResponseInviteDto, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "responseInvitation", null);
__decorate([
    (0, common_1.Post)('members/remove'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.RemoveMembersDto, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "removeMembers", null);
__decorate([
    (0, common_1.Post)('leave'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.LeaveBoardDto, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "leaveBoard", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, board_dto_1.DeleteBoardDto]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "deleteBoard", null);
BoardController = __decorate([
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
exports.BoardController = BoardController;
//# sourceMappingURL=board.controller.js.map
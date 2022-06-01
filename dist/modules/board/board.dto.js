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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBoardDto = exports.LeaveBoardDto = exports.GetBoardDto = exports.RemoveMembersDto = exports.ResponseInviteDto = exports.InviteDto = exports.QueryUserDto = exports.UpdateBoardDto = exports.PostBoardDto = void 0;
const class_validator_1 = require("class-validator");
const board_schema_1 = require("../../schemas/board.schema");
class PostBoardDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostBoardDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostBoardDto.prototype, "thumbnail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(board_schema_1.BOARD_PERMISSIONS),
    __metadata("design:type", String)
], PostBoardDto.prototype, "permission", void 0);
exports.PostBoardDto = PostBoardDto;
class UpdateBoardDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "thumbnail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(board_schema_1.BOARD_PERMISSIONS),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "permission", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "owner", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "description", void 0);
exports.UpdateBoardDto = UpdateBoardDto;
class QueryUserDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], QueryUserDto.prototype, "board", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], QueryUserDto.prototype, "query", void 0);
exports.QueryUserDto = QueryUserDto;
class InviteDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], InviteDto.prototype, "members", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InviteDto.prototype, "board", void 0);
exports.InviteDto = InviteDto;
class ResponseInviteDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ResponseInviteDto.prototype, "notification", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ResponseInviteDto.prototype, "result", void 0);
exports.ResponseInviteDto = ResponseInviteDto;
class RemoveMembersDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], RemoveMembersDto.prototype, "board", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RemoveMembersDto.prototype, "members", void 0);
exports.RemoveMembersDto = RemoveMembersDto;
class GetBoardDto {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetBoardDto.prototype, "id", void 0);
exports.GetBoardDto = GetBoardDto;
class LeaveBoardDto {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LeaveBoardDto.prototype, "board", void 0);
exports.LeaveBoardDto = LeaveBoardDto;
class DeleteBoardDto {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteBoardDto.prototype, "board", void 0);
exports.DeleteBoardDto = DeleteBoardDto;
//# sourceMappingURL=board.dto.js.map
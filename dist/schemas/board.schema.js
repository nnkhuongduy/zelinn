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
exports.BoardSchema = exports.Board = exports.BOARD_STATES = exports.BOARD_PERMISSIONS = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
exports.BOARD_PERMISSIONS = ['PUBLIC', 'PRIVATE'];
exports.BOARD_STATES = ['ACTIVE', 'ARCHIVED'];
let Board = class Board {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], Board.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Board.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Board.prototype, "thumbnail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Board.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: exports.BOARD_PERMISSIONS[0], enum: exports.BOARD_PERMISSIONS }),
    __metadata("design:type", String)
], Board.prototype, "permission", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }],
    }),
    __metadata("design:type", Array)
], Board.prototype, "members", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }],
    }),
    __metadata("design:type", Array)
], Board.prototype, "pending", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: exports.BOARD_STATES[0],
        enum: exports.BOARD_STATES,
    }),
    __metadata("design:type", String)
], Board.prototype, "state", void 0);
Board = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Board);
exports.Board = Board;
exports.BoardSchema = mongoose_1.SchemaFactory.createForClass(Board);
//# sourceMappingURL=board.schema.js.map
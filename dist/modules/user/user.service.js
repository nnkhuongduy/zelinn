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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const auth_service_1 = require("../auth/auth.service");
let UserService = class UserService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
    }
    async register({ name, phone, email, }) {
        if (await this.userModel.exists({ $or: [{ phone }, { email }] }))
            throw new common_1.NotAcceptableException('User already existed!');
        const user = await this.userModel.create({
            name,
            phone,
            email,
        });
        await this.authService.sendVerification(email);
        const { verification } = user, _user = __rest(user, ["verification"]);
        return _user;
    }
    async edit(id, { name, phone }) {
        const user = await this.userModel.findById(id).select('-verification');
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        if (user.phone !== phone && (await this.userModel.exists({ phone })))
            throw new common_1.ConflictException('User with this phone number already existed!');
        user.name = name;
        user.phone = phone;
        await user.save();
        return user;
    }
    async favBoard(userId, { id: boardId }) {
        const user = await this.userModel.findById(userId).select('-verification');
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        if (user.favBoards.find((id) => id.toString() === boardId)) {
            user.favBoards = user.favBoards.filter((id) => id.toString() !== boardId);
        }
        else {
            user.favBoards.push(boardId);
        }
        await user.save();
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
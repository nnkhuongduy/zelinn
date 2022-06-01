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
exports.AuthService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const dayjs = require("dayjs");
const mailer_1 = require("@nestjs-modules/mailer");
const user_schema_1 = require("../../schemas/user.schema");
const verification_schema_1 = require("../../schemas/verification.schema");
let AuthService = class AuthService {
    constructor(userModel, mailerService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
    }
    async verify(email, code) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        if (!user.verification)
            throw new common_1.NotAcceptableException('Verification not found!');
        if (dayjs(user.verification.expireAt).isBefore(dayjs()))
            throw new common_1.GoneException('Verification code is expired!');
        if (user.verification.code !== code)
            throw new common_1.ConflictException('Verification code is incorrect!');
        user.verification = null;
        await user.save();
        const _a = user.toJSON(), { verification } = _a, _user = __rest(_a, ["verification"]);
        return _user;
    }
    async checkUser(email) {
        return Boolean(await this.userModel.exists({ email }));
    }
    async sendVerification(email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        if (user.verification &&
            dayjs(user.verification.expireAt).isAfter(dayjs())) {
            return;
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        user.verification = new verification_schema_1.Verification();
        user.verification.code = code;
        user.verification.expireAt = dayjs().add(5, 'm').toDate();
        await user.save();
        await this.mailerService.sendMail({
            to: email,
            subject: 'Mã đăng nhập',
            text: `Mã đăng nhập zelinn của bạn: ${code}`,
        });
    }
    async auth(id) {
        const user = await this.userModel.findById(id).select('-verification');
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
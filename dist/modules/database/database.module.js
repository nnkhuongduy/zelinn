"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const board_schema_1 = require("../../schemas/board.schema");
const user_schema_1 = require("../../schemas/user.schema");
const notification_schema_1 = require("../../schemas/notification.schema");
const invitation_schema_1 = require("../../schemas/invitation.schema");
const list_schema_1 = require("../../schemas/list.schema");
const card_schema_1 = require("../../schemas/card.schema");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                {
                    name: board_schema_1.Board.name,
                    schema: board_schema_1.BoardSchema,
                },
                {
                    name: notification_schema_1.Notification.name,
                    schema: notification_schema_1.NotificationSchema,
                },
                {
                    name: invitation_schema_1.Invitation.name,
                    schema: invitation_schema_1.InvitationSchema,
                },
                {
                    name: list_schema_1.List.name,
                    schema: list_schema_1.ListSchema,
                },
                {
                    name: card_schema_1.Card.name,
                    schema: card_schema_1.CardSchema,
                },
            ]),
        ],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                {
                    name: board_schema_1.Board.name,
                    schema: board_schema_1.BoardSchema,
                },
                {
                    name: notification_schema_1.Notification.name,
                    schema: notification_schema_1.NotificationSchema,
                },
                {
                    name: invitation_schema_1.Invitation.name,
                    schema: invitation_schema_1.InvitationSchema,
                },
                {
                    name: list_schema_1.List.name,
                    schema: list_schema_1.ListSchema,
                },
                {
                    name: card_schema_1.Card.name,
                    schema: card_schema_1.CardSchema,
                },
            ]),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map
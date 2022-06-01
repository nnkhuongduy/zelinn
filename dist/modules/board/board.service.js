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
exports.BoardService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const board_schema_1 = require("../../schemas/board.schema");
const user_schema_1 = require("../../schemas/user.schema");
const notification_schema_1 = require("../../schemas/notification.schema");
const invitation_schema_1 = require("../../schemas/invitation.schema");
const list_schema_1 = require("../../schemas/list.schema");
let BoardService = class BoardService {
    constructor(boardModel, userModel, notificationModel, invitationModel, listModel) {
        this.boardModel = boardModel;
        this.userModel = userModel;
        this.notificationModel = notificationModel;
        this.invitationModel = invitationModel;
        this.listModel = listModel;
    }
    async onModuleInit() {
        try {
            if (await this.boardModel.collection.indexExists([
                'owner.email',
                'owner.phone',
            ])) {
                this.boardModel.collection.dropIndex('owner.email');
                this.boardModel.collection.dropIndex('owner.phone');
            }
        }
        catch (_a) { }
    }
    async getBoards(userId) {
        const user = await this.userModel.findById(userId);
        const boards = await this.boardModel
            .find({ members: userId, state: board_schema_1.BOARD_STATES[0] })
            .populate({ path: 'owner', select: '_id name avatar' })
            .populate({ path: 'members', select: '_id name avatar email' })
            .populate({ path: 'pending', select: '_id name avatar email' });
        let isOwner = false;
        if (boards.length > 0)
            isOwner = boards[0].owner._id.toString() === userId;
        return [
            ...boards.filter(({ _id }) => user.favBoards.includes(_id)),
            ...boards.filter(({ _id }) => !user.favBoards.includes(_id)),
        ].map((board) => {
            const _board = board.toJSON();
            return Object.assign(Object.assign({}, _board), { members: _board.members.map((member) => (Object.assign(Object.assign({}, member), { email: isOwner ? member.email : undefined }))), pending: _board.pending.map((member) => (Object.assign(Object.assign({}, member), { email: isOwner ? member.email : undefined, pending: true }))), faved: user.favBoards.includes(board._id) });
        });
    }
    async getBoard(userId, boardId) {
        const board = await this.boardModel
            .findOne({ _id: boardId, state: board_schema_1.BOARD_STATES[0] })
            .populate({ path: 'owner', select: '_id name avatar' })
            .populate({ path: 'members', select: '_id name avatar email' })
            .populate({ path: 'pending', select: '_id name avatar email' });
        const isOwn = board.members.findIndex(({ _id }) => _id.toString() === userId) !== -1;
        const isOwner = board.owner.id === userId;
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        if (!isOwn)
            throw new common_1.BadRequestException('Not a member of this board!');
        const _board = board.toJSON();
        return Object.assign(Object.assign({}, _board), { members: _board.members.map((member) => (Object.assign(Object.assign({}, member), { email: isOwner ? member.email : undefined }))), pending: _board.pending.map((member) => (Object.assign(Object.assign({}, member), { email: isOwner ? member.email : undefined, pending: true }))) });
    }
    async createBoard(userId, { name, thumbnail, permission }) {
        await this.boardModel.create({
            owner: userId,
            name,
            thumbnail,
            permission,
            members: [userId],
        });
    }
    async updateBoard(userId, { id, name, permission, thumbnail, owner: ownerId, description, }) {
        const board = await this.boardModel.findOne({
            _id: id,
            owner: userId,
            state: board_schema_1.BOARD_STATES[0],
        });
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        const oldName = board.name;
        const oldDescription = board.description;
        const oldThumbnail = board.thumbnail;
        const oldOwner = board.owner;
        board.name = name;
        board.permission = permission;
        board.thumbnail = thumbnail;
        board.owner = ownerId;
        board.description = description;
        this.notificationModel.create({
            user: oldOwner,
            title: `Thông tin bảng ${oldName} đã được cập nhật`,
            label: `Bảng ${oldName}`,
            description: oldDescription,
            icon: oldThumbnail,
        });
        if (oldOwner.toString() !== ownerId) {
            this.notificationModel.create({
                user: oldOwner,
                title: `Bạn không còn sở hữu bảng ${oldName}!`,
                label: `Bảng ${oldName}`,
                description: `Quyền sở hữu của bảng này đã bị thay đổi!`,
                icon: oldThumbnail,
            });
            this.notificationModel.create({
                user: ownerId,
                title: `Bạn đã được cập nhật sở hữu bảng ${oldName}!`,
                label: `Bảng ${oldName}`,
                description: `Quyền sở hữu của bảng này đã được thay đổi!`,
                icon: oldThumbnail,
            });
        }
        await board.save();
    }
    async queryUserToInvite(userId, { board: boardId, query }) {
        const board = await this.boardModel.findOne({
            _id: boardId,
            state: board_schema_1.BOARD_STATES[0],
        });
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        const users = await this.userModel
            .find({
            $and: [
                { $or: [{ email: query }, { name: query }] },
                { _id: { $ne: userId } },
                { _id: { $nin: board.pending } },
            ],
        })
            .select('_id name email avatar');
        return users.map((user) => (Object.assign(Object.assign({}, user.toJSON()), { pending: board.pending.includes(user._id) })));
    }
    async invite(ownerId, { members, board: boardId }) {
        const board = await this.boardModel.findOne({
            _id: boardId,
            state: board_schema_1.BOARD_STATES[0],
        });
        const owner = await this.userModel.findById(ownerId);
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        if (!owner)
            throw new common_1.NotFoundException('Owner not found!');
        for (const member of members) {
            const user = await this.userModel.findById(member);
            const notification = await this.notificationModel.create({
                user,
                title: `${owner.name} đã mời bạn tham gia bảng!`,
                label: board.name,
                description: board.description,
                icon: board.thumbnail,
                type: notification_schema_1.NOTIFICATION_TYPES[1],
            });
            await this.invitationModel.create({
                board: board._id,
                user: member,
                notification: notification._id,
            });
        }
        board.pending = [...board.pending, ...members];
        await board.save();
    }
    async responseInvitation(userId, { notification: notiId, result }) {
        const notification = await this.notificationModel.findById(notiId);
        const user = await this.userModel.findById(userId);
        const invitation = await this.invitationModel.findOne({
            user: userId,
            notification: notiId,
        });
        const board = await this.boardModel
            .findOne({ _id: invitation.board, state: board_schema_1.BOARD_STATES[0] })
            .populate('owner');
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        if (!notification)
            throw new common_1.NotFoundException('Notification not found!');
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        if (!invitation)
            throw new common_1.NotFoundException('Invitation not found!');
        notification.seen = true;
        invitation.confirmed = true;
        invitation.result = result;
        await notification.save();
        await invitation.save();
        board.pending = board.pending.filter((id) => id.toString() !== userId);
        if (result) {
            board.members.push(userId);
            await this.notificationModel.create({
                user: userId,
                title: `Bạn đã chấp nhận lời mời tham gia bảng của ${board.owner.name}`,
                label: board.name,
                description: board.description,
                icon: board.thumbnail,
            });
        }
        else {
            await this.notificationModel.create({
                user: userId,
                title: `Bạn đã từ chối lời mời tham gia bảng của ${board.owner.name}`,
                label: board.name,
                description: board.description,
                icon: board.thumbnail,
            });
        }
        await board.save();
    }
    async removeMembers(userId, { board: boardId, members }) {
        const board = await this.boardModel
            .findOne({ _id: boardId, state: board_schema_1.BOARD_STATES[0] })
            .populate({ path: 'owner', select: '_id name avatar' });
        if (!board)
            throw new common_1.NotFoundException('Board not found');
        if (board.owner._id.toString() !== userId)
            throw new common_1.BadRequestException('Not the owner');
        board.members = board.members.filter((id) => !members.includes(id.toString()));
        for (const memberId of board.members) {
            this.userModel.findByIdAndUpdate(memberId.toString(), {
                $pull: {
                    favBoards: boardId,
                },
            });
        }
        await board.save();
    }
    async leaveBoard(userId, { board: boardId }) {
        const board = await this.boardModel.findOne({
            _id: boardId,
            members: userId,
            state: board_schema_1.BOARD_STATES[0],
        });
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        board.members = board.members.filter((id) => id.toString() !== userId);
        await board.save();
    }
    async deleteBoard(userId, { board: boardId }) {
        const board = await this.boardModel.findOne({
            _id: boardId,
            members: userId,
            state: board_schema_1.BOARD_STATES[0],
        });
        if (!board)
            throw new common_1.NotFoundException('Board not found!');
        board.state = board_schema_1.BOARD_STATES[1];
        await board.save();
        await this.listModel.updateMany({
            board: board._id,
        }, {
            state: list_schema_1.LIST_STATES[1],
        });
    }
};
BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(board_schema_1.Board.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_2.InjectModel)(notification_schema_1.Notification.name)),
    __param(3, (0, mongoose_2.InjectModel)(invitation_schema_1.Invitation.name)),
    __param(4, (0, mongoose_2.InjectModel)(list_schema_1.List.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=board.service.js.map
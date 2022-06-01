/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from 'src/schemas/notification.schema';
export declare class NotificationService {
    private readonly notificationModel;
    constructor(notificationModel: Model<NotificationDocument>);
    getNotifications(user: string): Promise<(Notification & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}

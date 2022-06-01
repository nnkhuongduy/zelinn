/// <reference types="multer" />
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadAvatar(file: Express.Multer.File, req: any): Promise<import("../../schemas/user.schema").UserDocument>;
    uploadThumbnail(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}

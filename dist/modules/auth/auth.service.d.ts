import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDocument } from 'src/schemas/user.schema';
export declare class AuthService {
    private readonly userModel;
    private readonly mailerService;
    constructor(userModel: Model<UserDocument>, mailerService: MailerService);
    verify(email: string, code: string): Promise<UserDocument>;
    checkUser(email: string): Promise<boolean>;
    sendVerification(email: string): Promise<void>;
    auth(id: string): Promise<UserDocument>;
}

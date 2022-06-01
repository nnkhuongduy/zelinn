import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, code: string): Promise<Omit<User, 'verification'>>;
}
export {};

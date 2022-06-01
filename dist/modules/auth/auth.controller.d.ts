import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { AuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    login(body: AuthLoginDto): Promise<void>;
    verify(req: any): Promise<{
        token: string;
    }>;
    auth(req: any): Promise<UserDocument>;
}

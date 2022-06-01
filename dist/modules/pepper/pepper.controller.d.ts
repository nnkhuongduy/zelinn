import { PepperQueryDto } from './pepper.dto';
import { PepperService } from './pepper.service';
export declare class PepperController {
    private readonly pepperService;
    constructor(pepperService: PepperService);
    getPepper(req: any, query: PepperQueryDto): Promise<any[]>;
}

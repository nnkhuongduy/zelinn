import { CreateListDto, DeleteListDto, GetListDto, GetListsDto, UpdateListDto } from './list.dto';
import { ListService } from './list.service';
export declare class ListController {
    private readonly listService;
    constructor(listService: ListService);
    getLists(query: GetListsDto, req: any): Promise<any[]>;
    createList(body: CreateListDto, req: any): Promise<void>;
    getList(req: any, query: GetListDto): Promise<any>;
    updateList(req: any, body: UpdateListDto): Promise<void>;
    deleteList(req: any, query: DeleteListDto): Promise<void>;
}

import { SearchModel } from '../../models/commonModels/search.model';
export interface UserSearchModel extends SearchModel {
    roleId: number;
}
import { PagingModel } from "./paging.model";

export interface SearchModel extends PagingModel {
    id?:any,
    searching?:string
}
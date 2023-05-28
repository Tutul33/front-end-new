import { SearchModel } from "../commonModels/search.model"

export interface Role{
    roleId?:any,
    roleName:string,
    sequence:number,
    isActive:boolean
}
export interface RoleModels extends SearchModel{
    roles?:Role[],
    total:number
}
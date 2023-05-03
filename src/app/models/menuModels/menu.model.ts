import { SearchModel } from "../commonModels/search.model";

export interface Menu{
    menuId:number;
    menuName:string;
    moduleId:number;
    moduleName?:string;
    menuColor:string;
    parentId:number;
    isSubParent:boolean;
    subParentId:number;
    menuIcon:string;
    menuPath:string;
    description:string;
    menuList?:Menu[];
    menuSequence:number;    
    permissionId?:number;
    canCreate?:boolean;
    canEdit?:boolean;
    canDelete?:boolean;
    canView?:boolean;
    userId?:number;
    roleId?:number;
    isActive?:boolean;    
    isSuccess?:boolean;
    total?:number;
}
export interface MenuPermission{    
    permissionId:number;
    menuId?:number;
    menuName?:string;
    moduleId?:number;
    moduleName?:string;   
    canCreate:boolean;
    canEdit:boolean;
    canDelete:boolean;
    canView:boolean;
    userId:number;
    roleId:number;
    roleName?:string; 
    isActive?:boolean;    
    isSuccess?:boolean;
    total?:number;
}
export interface SearchMenuPermissions extends SearchModel {
    moduleId?:number,
    roleId?:number
}
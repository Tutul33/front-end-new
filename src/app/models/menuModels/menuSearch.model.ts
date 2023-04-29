import { Menu, MenuPermission } from "./menu.model";

export interface MenuModels{
    menuList:Menu[];
    total:number;
}
export interface MenuPermissionModels{
    menuPermissionList:MenuPermission[];
    total:number;
}
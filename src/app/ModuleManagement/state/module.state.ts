import { Menu, MenuPermission } from "src/app/models/menuModels/menu.model";
import { Modules } from "src/app/models/moudleNodels/modules.model";

export interface ModuleState{
    modules:Modules[];
    menus:Menu[];
    menuPermissions:MenuPermission[];
    total:number;
}
export const initialState:ModuleState={
    menus: [],
    total: 0,
    modules: [],
    menuPermissions: []
}
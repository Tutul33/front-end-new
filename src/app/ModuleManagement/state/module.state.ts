import { Menu } from "src/app/models/menuModels/menu.model";

export interface ModuleState{
    menus:Menu[];
    total:number;
}
export const initialState:ModuleState={
    menus: [],
    total: 0
}
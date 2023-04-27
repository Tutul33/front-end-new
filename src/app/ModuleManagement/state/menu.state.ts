import { Menu } from "src/app/models/menuModels/menu.model";

export interface MenuState{
    menus:Menu[];
    total:number;
}
export const initialState:MenuState={
    menus: [],
    total: 0
}
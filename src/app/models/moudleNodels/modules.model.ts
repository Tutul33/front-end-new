import { Menu } from "../menuModels/menu.model";

export interface Modules{
    moduleId:number;
    moduleName:string;
    description?:string;
    moduleIcon?:string;
    moduleColor?:string;
    modulePath?:string;
    moduleSequence?:number;
    isActive?:boolean
    menus?:Menu[],
    isSuccess?:boolean;
    total?:number;
}
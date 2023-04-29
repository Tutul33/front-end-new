import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { ModuleState } from "./module.state";

export const MENU_STATE_NAME='menu';
const getModuleState = createFeatureSelector<ModuleState>(MENU_STATE_NAME);
export const getModules=createSelector(getModuleState,(state)=>{
    return state.modules;
});
export const getMenus=createSelector(getModuleState,(state)=>{
    return state.menus;
});
export const getMenuPermissions=createSelector(getModuleState,(state)=>{
    return state.menuPermissions;
});
export const getModulesTotal=createSelector(getModuleState,(state)=>{
    return state.total;
});
export const getMenusTotal=createSelector(getModuleState,(state)=>{
    return state.total;
});
export const getMenuPermissionTotal=createSelector(getModuleState,(state)=>{
    return state.total;
});
export const getModulesAll = createSelector(getModules,getModulesTotal, (modules,total)=>{
    return {modules,total};
  });
export const getMenusAll = createSelector(getMenus,getMenusTotal, (menus,total)=>{
    return {menus,total};
  });
export const getMenuPermissionsAll = createSelector(getMenuPermissions,getMenuPermissionTotal, (menuPermissions,total)=>{
    return {menuPermissions,total};
  });
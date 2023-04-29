import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
    return state.user ? true : false;
});
export const getToken = createSelector(getAuthState, (state) => {
    return state.user ? state.user.userToken : null;
});
export const getToggle=createSelector(getAuthState,(state)=>{
    return state.isToggle;
});
export const getUserPassChangeInfo=createSelector(getAuthState,(state)=>{
    return state.userPass;
});
export const getUserInfo=createSelector(getAuthState,(state)=>{
    return state.user;
});
export const getAthourizedModules=createSelector(getAuthState,(state)=>{
    return state.modules;
});
export const getCurrentModuleId=createSelector(getAuthState,(state)=>{
    return state.currentModuleId;
});
export const getCurrentModulePath=createSelector(getAuthState,(state)=>{
    return state.currentModulePath;
});
export const getCurrentMenuId=createSelector(getAuthState,(state)=>{
    return state.currentMenuId;
});
export const getCurrentMenuPath=createSelector(getAuthState,(state)=>{
    return state.currentMenuPath;
});
export const getCanCreate=createSelector(getAuthState,(state)=>{
    return state.canCreate;
});
export const getCanView=createSelector(getAuthState,(state)=>{
    return state.canView;
});
export const getCanDelete=createSelector(getAuthState,(state)=>{
    return state.canDelete;
});
export const getCanEdit=createSelector(getAuthState,(state)=>{
    return state.canEdit;
});
export const getAthourizedActions=createSelector(
    getCurrentModuleId,
    getCurrentModulePath,
    getCurrentMenuId,
    getCurrentMenuPath,
    getCanCreate,getCanView,
    getCanDelete,getCanEdit,(moduleId,modulepath,menuId,menuPath,canCreate,canView,canDelete,canEdit)=>{
    return {moduleId,modulepath,menuId,menuPath,canCreate,canView,canDelete,canEdit};
});
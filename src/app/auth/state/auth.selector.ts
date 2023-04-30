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
export const getAthourizedActions=createSelector(
    getAuthState,(state)=>{
    return state.currentModulePath;
});
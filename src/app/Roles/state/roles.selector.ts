import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RoleState } from "./role.state";

export const ROLE_STATE_NAME='role';
const getRoleState = createFeatureSelector<RoleState>(ROLE_STATE_NAME);

export const getRoles=createSelector(getRoleState,(state)=>{
    return state.roles;
});
export const getRolesTotal=createSelector(getRoleState,(state)=>{
    return state.total;
});
export const getRolesAll = createSelector(getRoles,getRolesTotal, (roles,total)=>{
    return {roles,total};
  });
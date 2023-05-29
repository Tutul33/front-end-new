import { createAction, props } from "@ngrx/store";
import { Role } from "src/app/models/commonModels/role.model";
import { SearchModel } from "src/app/models/commonModels/search.model";
import { RoleModels } from "src/app/models/rolesModel/role.model";

export const ADD_ROLE="[ROLE Page] add ROLE";
export const ADD_ROLE_SUCCESS="[ROLE Page] add ROLE success";
export const ADD_ROLE_FAIL="[ROLE Page] add ROLE FAILS";
export const UPDATE_ROLE="[ROLE Page] UPDATE ROLE";
export const UPDATE_ROLE_SUCCESS="[ROLE Page] UPDATE ROLE success";
export const DELETE_ROLE="[ROLE Page] DELETE ROLE ";
export const DELETE_ROLE_SUCCESS="[ROLE Page] DELETE ROLE success";
export const LOAD_ROLE="[ROLE Page] LOAD ROLE ";
export const LOAD_ROLE_SUCCESS="[ROLE Page] LOAD ROLE success";

export const addRole=createAction(ADD_ROLE,props<{role:Role}>())
export const addRoleSuccess=createAction(ADD_ROLE_SUCCESS,props<{role:Role}>())
export const addRoleFail=createAction(ADD_ROLE_FAIL)
export const updateRole=createAction(UPDATE_ROLE,props<{role:Role}>())
export const updateRoleSuccess=createAction(UPDATE_ROLE_SUCCESS,props<{role:Role}>())

export const deleteRole=createAction(DELETE_ROLE,props<{id:number}>())
export const deleteRoleSuccess=createAction(DELETE_ROLE_SUCCESS,props<{id:number,total:number}>())

export const loadRole=createAction(LOAD_ROLE,props<{search:RoleModels}>())
export const loadRoleSuccess=createAction(LOAD_ROLE_SUCCESS,props<{roles:RoleModels}>())
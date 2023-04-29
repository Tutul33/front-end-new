import { createAction, props } from "@ngrx/store";
import { SearchModel } from "src/app/models/commonModels/search.model";
import { IUserModel, UserModels } from "src/app/models/userModels/user.model";

export const ADD_USER_ACTION = '[users page] add user';
export const ADD_USER_SUCCESS = '[users page] add user success';
export const ADD_USER_FAIL = '[users page] add user fail';
export const UPDATE_USER_ACTION = '[users page] update user';
export const UPDATE_USER_SUCCESS = '[users page] update user success';
export const DELETE_USER_ACTION = '[users page] delete user';
export const DELETE_USER_SUCCESS = '[users page] delete user success';
export const LOAD_USERS = '[users page] LOAD users';
export const LOAD_USERS_SUCCESS = '[users page] load user success';

export const addUser=createAction(ADD_USER_ACTION,props<{user:IUserModel}>());
export const addUserSuccess=createAction(ADD_USER_SUCCESS,props<{user:IUserModel}>());
export const addUserFail=createAction(ADD_USER_FAIL);

export const updateUser=createAction(UPDATE_USER_ACTION,props<{user:IUserModel}>())
export const updateUserSuccess=createAction(UPDATE_USER_SUCCESS,props<{user:IUserModel}>())

export const deleteUser=createAction(DELETE_USER_ACTION,props<{id:number}>())
export const deleteUserSuccess=createAction(DELETE_USER_SUCCESS,props<{id:number,total:number}>())

export const loadUsers=createAction(LOAD_USERS,props<{search:SearchModel}>());
export const loadUsersSuccess=createAction(LOAD_USERS_SUCCESS,props<{users:UserModels}>());
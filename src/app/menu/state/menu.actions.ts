import { createAction, props } from "@ngrx/store";
import { SearchModel } from "src/app/models/commonModels/search.model";
import { Menu } from "src/app/models/menuModels/menu.model";
import { MenuModels } from "src/app/models/menuModels/menuSearch.model";
export const ADD_MENU="[Menu Page] add menu";
export const ADD_MENU_SUCCESS="[Menu Page] add menu success";
export const UPDATE_MENU="[Menu Page] UPDATE menu";
export const UPDATE_MENU_SUCCESS="[Menu Page] UPDATE menu success";
export const DELETE_MENU="[Menu Page] DELETE menu ";
export const DELETE_MENU_SUCCESS="[Menu Page] DELETE menu success";
export const LOAD_MENU="[Menu Page] LOAD menu ";
export const LOAD_MENU_SUCCESS="[Menu Page] LOAD menu success";

export const addMenu=createAction(ADD_MENU,props<{menu:Menu}>)
export const addMenuSuccess=createAction(ADD_MENU_SUCCESS,props<{menu:Menu}>)

export const updateMenu=createAction(UPDATE_MENU,props<{menu:Menu}>)
export const updateMenuSuccess=createAction(UPDATE_MENU_SUCCESS,props<{menu:Menu}>)

export const deleteMenu=createAction(DELETE_MENU,props<{menu:Menu}>)
export const deleteMenuSuccess=createAction(DELETE_MENU_SUCCESS,props<{menu:Menu}>)

export const loadMenu=createAction(LOAD_MENU,props<{search:SearchModel}>)
export const loadMenuSuccess=createAction(LOAD_MENU_SUCCESS,props<{menu:MenuModels}>)
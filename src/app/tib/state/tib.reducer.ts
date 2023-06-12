import { createAction, props } from "@ngrx/store";
import { TibModels } from "src/app/models/tibModels/tibModel";

export const OPEN_TIB_SESSION="[TIB Page] add TIB";
export const OPEN_TIB_SESSION_SUCCESS="[TIB Page] add TIB success";
export const OPEN_TIB_SESSION_FAIL="[TIB Page] add TIB FAILS";
export const UPDATE_TIB="[TIB Page] UPDATE TIB";
export const UPDATE_TIB_SUCCESS="[TIB Page] UPDATE TIB success";
export const DELETE_TIB="[TIB Page] DELETE TIB ";
export const DELETE_TIB_SUCCESS="[TIB Page] DELETE TIB success";
export const LOAD_TIB="[TIB Page] LOAD TIB ";
export const LOAD_TIB_SUCCESS="[TIB Page] LOAD TIB success";

export const openTibSesion=createAction(OPEN_TIB_SESSION)
export const openTibSesionSuccess=createAction(OPEN_TIB_SESSION_SUCCESS,props<{tibMenu:TibModels}>())
export const openTibSesionFail=createAction(OPEN_TIB_SESSION_FAIL)
// export const updateTIB=createAction(UPDATE_TIB,props<{TIB:TIB}>())
// export const updateTIBSuccess=createAction(UPDATE_TIB_SUCCESS,props<{TIB:TIB}>())

// export const deleteTIB=createAction(DELETE_TIB,props<{id:number}>())
// export const deleteTIBSuccess=createAction(DELETE_TIB_SUCCESS,props<{id:number,total:number}>())

// export const loadTIB=createAction(LOAD_TIB,props<{search:SearchModel}>())
// export const loadTIBSuccess=createAction(LOAD_TIB_SUCCESS,props<{TIBs:TIBModels}>())
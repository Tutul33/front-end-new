import { createAction, props } from "@ngrx/store";
import { SearchModel } from "src/app/models/commonModels/search.model";
import { ChatModel, ChatModels } from "../models/chatModel";
//Module Variable
export const ADD_CHAT="[CHAT Page] add CHAT";
export const ADD_CHAT_SUCCESS="[CHAT Page] add CHAT success";
export const ADD_CHAT_FAIL="[CHAT Page] add CHAT FAILS";
export const UPDATE_CHAT="[CHAT Page] UPDATE CHAT";
export const UPDATE_CHAT_SUCCESS="[CHAT Page] UPDATE CHAT success";
export const DELETE_CHAT="[CHAT Page] DELETE CHAT ";
export const DELETE_CHAT_SUCCESS="[CHAT Page] DELETE CHAT success";
export const LOAD_CHAT="[CHAT Page] LOAD CHAT ";
export const LOAD_CHAT_SUCCESS="[CHAT Page] LOAD CHAT success";


//CHAT Actions
export const addChat=createAction(ADD_CHAT,props<{chat:ChatModel}>())
export const addChatSuccess=createAction(ADD_CHAT_SUCCESS,props<{chat:ChatModel}>())

export const updateChat=createAction(UPDATE_CHAT,props<{chat:ChatModel}>())
export const updateChatSuccess=createAction(UPDATE_CHAT_SUCCESS,props<{chat:ChatModel}>())

export const deleteChat=createAction(DELETE_CHAT,props<{id:number}>())
export const deleteChatSuccess=createAction(DELETE_CHAT_SUCCESS,props<{id:number,total:number}>())

export const loadChat=createAction(LOAD_CHAT,props<{search:SearchModel}>())
export const loadChatSuccess=createAction(LOAD_CHAT_SUCCESS,props<{chat:ChatModels}>())
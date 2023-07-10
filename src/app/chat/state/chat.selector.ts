import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { ChatState } from "./chat.state";

export const CHAT_STATE_NAME='chat';
const getChatState = createFeatureSelector<ChatState>(CHAT_STATE_NAME);
export const getChats=createSelector(getChatState,(state)=>{
    return state.chats;
});
export const getChatsTotal=createSelector(getChatState,(state)=>{
    return state.total;
});
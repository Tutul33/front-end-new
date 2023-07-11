import { createReducer, on } from "@ngrx/store"
import { initialState } from "./chat.state";
import { addChatSuccess, deleteChatSuccess, loadChatSuccess, updateChatSuccess } from "./chat.actions";

 export const _chatReducer=createReducer(initialState,
   //Chat
   on(addChatSuccess,(state,action)=>{
      let chat = { ...action.chat };
      return {
          ...state,
          modules: [...state.chats, chat],
          //total:action.chat.total as number
      }
  }),
  on(updateChatSuccess, (state, action) => {  
      const updatedChats = state.chats.map((chat) => {
          return action.chat.id === chat.id ? action.chat : chat;
      });
      return {
          ...state,
          chats: updatedChats
      }
  }),
  on(deleteChatSuccess, (state, { id,total }) => {
      const updatedChats = state.chats.filter(chat => {
          return chat.id != id;
      });
      return {
          ...state,
          modules: updatedChats,
          total:total
      }
  }),
  on(loadChatSuccess, (state, action) => {        
      return {
          ...state,
          chats: action.chat.chatList,
          total:action.chat.total
      }
  }),
  
 );
 export function chatReducer(state: any, action: any) {
   return _chatReducer(state, action);
}
import { ChatModel } from "../models/chatModel";

export interface ChatState{
    chats:ChatModel[];
    total:number;
}
export const initialState:ChatState={
    chats: [],
    total: 0
}
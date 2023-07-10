import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { SearchModel } from "src/app/models/commonModels/search.model";
import { environment } from "src/environments/environment";
import { ChatModel, ChatModels } from "../models/chatModel";
@Injectable({
    providedIn:'root'
})
export class ChatService{
    constructor(private http:HttpClient){
    }
    //Chats
    getChats(search:SearchModel): Observable<ChatModels> {
        let filter='';
        let url=`${environment.API_URL}/api/module/GetModuleList`;
        if(search.pageNumber!=undefined || search.pageNumber!=null){
            filter+='PageNumber='+search.pageNumber;
        }
        if(search.pageSize){
            filter+='&PageSize='+search.pageSize;
        }
        if (search.searching) {
            filter+='&search='+search.searching;
        }
        if (filter!='') {
            url=url+'?'+filter;
        }
        return this.http
            .get(url)
            .pipe(
                map((data: any) => {
                    const chats: ChatModel[] = [];
                    for (let key in data.list) {
                      chats.push({ ...data.list[key], id: key });
                    }
                    const chatList=chats.sort().reverse();
                    const chatModel:ChatModels={
                        chatList: chatList,
                        total: data.total
                    }
                    return chatModel;
                }
                )
            );
    }
    addChat(user: ChatModel): Observable<ChatModel> {
        let url=`${environment.API_URL}/api/chat/CreateChat`;
        return this.http.post<ChatModel>(url, user);
    }
    updateChat(user: ChatModel) {
        let url=`${environment.API_URL}/api/chat/UpdateChat`;
        return this.http
            .put<ChatModel>(url, user);
    }
    deleteChat(id: number):Observable<ChatModel> {
        let url=`${environment.API_URL}/api/chat/DeleteChat/${id}`;      
        return this.http.delete<ChatModel>(url);
    }
    getChatById(id: number):Observable<ChatModel> {
        let url=`${environment.API_URL}/api/chat/GetChatById/${id}`;      
        return this.http.get<ChatModel>(url);
    }
    
}
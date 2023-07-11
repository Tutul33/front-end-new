import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.action';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import { addChat, loadChat, updateChat } from '../state/chat.actions';
import { ChatModel } from '../models/chatModel';
import { getUserInfo } from 'src/app/auth/state/auth.selector';
import { UserModel } from 'src/app/models/userModels/user.model';
import { Subscription } from 'rxjs';
import { SearchModel } from 'src/app/models/commonModels/search.model';
import { getChats } from '../state/chat.selector';
declare var signalR: any;
@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {
  loggedUserId:number;
  chattingList:ChatModel[]=[];
  constructor(private store: Store<AppState> ) {

  }
  ngOnInit(): void {
    this.store.select(getUserInfo).subscribe((user:any)=>{
      this.fromUserId=user.customerId;
    })
    this.signalrConn();
  }
  chatSubscription:Subscription;
  loadAllChat(){
    let searchModel:SearchModel={

    }
    this.store.dispatch(loadChat({search:searchModel}));
    this.chatSubscription=this.store.select(getChats).subscribe((data:any)=>{
      if (data) {
        this.chattingList=data;
      }
    });
  }
  signalrConn() {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.API_URL}` + "/api/broadcast")
      .build();

    connection.on("BroadcastMessage", (data: any) => {
      console.log(data);
      this.chattingList.push(data);
    });

    connection.start()
      .then(() =>
       connection.invoke("BroadcastMessage", "Hello")
       );
  }
  message:string;
  fromUserId:number;
  toUserId:number;
  sendMessage(){
    let chat:ChatModel={
      id: 0,
      messages: this.message,
      mediaUrl: '',
      mediaExt: '',
      fromUserId:this.fromUserId,
      toUserId:this.toUserId,
      isActive: false
    }
    this.store.dispatch(setLoadingSpinner({status:true}));
    if (chat.id>0) {
     this.store.dispatch(updateChat({chat}));
    } else {
     this.store.dispatch(addChat({chat}));
    }
  }








}


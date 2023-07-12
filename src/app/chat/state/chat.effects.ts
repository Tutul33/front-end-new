import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { MessageService } from "src/app/services/commonServices/toastr.service";
import { AppState } from "src/app/store/app.state";
import { addChat, addChatFail, addChatSuccess, deleteChat, deleteChatSuccess, loadChat, loadChatSuccess, updateChat, updateChatSuccess } from "./chat.actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.action";
import { ChatService } from "../services/chat.service";

@Injectable()
export class ChatEffects{
    constructor(
        private action$: Actions,
        private chatService:ChatService,
        private store: Store<AppState>,
        private route: Router,
        private messageService:MessageService) {

    }
    //Modules
    loadChats$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadChat),
            mergeMap((action) => {
                return this.chatService.getChats(action.search).pipe(map((chat) => {
                    return loadChatSuccess({ chat })
                }));
            })
        );
    });
    addChat$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addChat),           
            exhaustMap((action) => {
                return this.chatService.addChat(action.chat).pipe(
                    map((data:any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));

                        if (data.resdata.isSuccess) {
                            this.messageService.showSuccessMessage('Chat is created successfully.');
                            const chat = { ...action.chat, id: data.id }
                            return addChatSuccess({ chat });                            
                        } else {
                            this.messageService.showErrorMessage('Chat creation is failed.Please try again.');
                            return addChatFail();
                        }
                       
                    }),
                    catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = 'Error occurred.Chat creation is failed.Please try again.';
                        this.messageService.showErrorMessage('Chat creation is failed.Please try again');
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })

        );
    });
    updateChat$ = createEffect(() => {
        return this.action$.pipe(
            ofType(updateChat),
            switchMap((action) => {
                return this.chatService.updateChat(action.chat)
                .pipe(
                    map((data) => 
                    {
                        this.store.dispatch(setLoadingSpinner({status:false}));
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage('Chat is updated successfully.');
                        } else {
                            this.messageService.showErrorMessage('Chat update is failed.');  
                        }                        
                        return updateChatSuccess({ chat: action.chat });
                   }),
                   catchError((errorRes) => {
                       this.store.dispatch(setLoadingSpinner({ status: false }))
                       const errorMessage = 'Error occurred.Chat update is failed.Please try again.';
                       this.messageService.showErrorMessage('Chat update is failed.Please try again');
                       return of(setErrorMessage({ message: errorMessage }));
                   })
                )
            })
        );
    });
    deleteChat$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deleteChat),
            switchMap((action) => {
                return this.chatService.deleteChat(action.id).pipe(map((data) => {
                    if (data.isSuccess) {
                      this.messageService.showSuccessMessage('Chat is deleted sucessfully.');  
                    }else{
                      this.messageService.showErrorMessage('Chat delete is failed.');  
                    }
                    return deleteChatSuccess({ id: action.id,total:data.total as number });
                }))
            })
        );
    });
   
    
}


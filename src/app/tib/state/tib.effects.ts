import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { MessageService } from "src/app/services/commonServices/toastr.service";
import { AppState } from "src/app/store/app.state";
import { openTibSesion, openTibSesionFail, openTibSesionSuccess } from "./tib.reducer";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.action";

@Injectable()
export class tibEffects{
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private route: Router,
        private messageService:MessageService) 
    {
    }
    // loadTibMenus$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(loadRole),
    //         mergeMap((action) => {
    //             return this.roleService.getRoles(action.search).pipe(map((roles) => {
    //                 return loadRoleSuccess({ roles })
    //             }));
    //         })
    //     );
    // });
    // addRole$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(openTibSesion),           
    //         exhaustMap((action) => {
    //             //var postModel=this.roleService.FormData(action.user,action.uploadedFile);
    //             return this.roleService.addRole(action.role).pipe(
    //                 map((data:any) => {
    //                     var result=data.result;
    //                     this.store.dispatch(setLoadingSpinner({ status: false }))
    //                     this.store.dispatch(setErrorMessage({ message: '' }))
    //                     if (result.isSuccess) {
    //                         this.messageService.showSuccessMessage('Role is created successfully.');
    //                         const role = { ...action.role, id: data.roleId }
    //                         return openTibSesionSuccess({ role });                            
    //                     } else {
    //                         this.messageService.showErrorMessage('Role creation is failed.Please try again.');
    //                         return openTibSesionFail();
    //                     }                       
    //                 }),
    //                 catchError((errorRes) => {
    //                     this.store.dispatch(setLoadingSpinner({ status: false }))
    //                     const errorMessage = 'Error occurred.Role creation is failed.Please try again.';
    //                     this.messageService.showErrorMessage('Role creation is failed.Please try again');
    //                     return of(setErrorMessage({ message: errorMessage }));
    //                 })
    //             )
    //         })

    //     );
    // });
}
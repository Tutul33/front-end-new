import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { UserService } from "src/app/services/userServices/user.service";
import { AppState } from "src/app/store/app.state";
import {
    addUser, addUserSuccess,
    updateUser, updateUserSuccess,
    deleteUser, deleteUserSuccess,
    loadUsers, loadUsersSuccess, addUserFail
} from "./users.action";
import { catchError, exhaustMap, filter, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { Update } from "@ngrx/entity";
import { IUserModel, UserModel } from "src/app/models/userModels/user.model";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.action";
import { MessageService } from "src/app/services/commonServices/toastr.service";
@Injectable()
export class UsersEffects {
    constructor(
        private action$: Actions,
        private userService: UserService,
        private store: Store<AppState>,
        private route: Router,
        private messageService:MessageService) {

    }
    loadUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadUsers),
            mergeMap((action) => {
                return this.userService.getUsers(action.search).pipe(map((users) => {
                    return loadUsersSuccess({ users })
                }));
            })
        );
    });
    addUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addUser),           
            exhaustMap((action) => {
                return this.userService.addUser(action.user).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: '' }))
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage('User is created successfully.');
                            const user = { ...action.user, id: data.customerId }
                            return addUserSuccess({ user });                            
                        } else {
                            this.messageService.showErrorMessage('User creation is failed.Please try again.');
                            return addUserFail();
                        }
                       
                    }),
                    catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = 'Error occurred.User creation is failed.Please try again.';
                        this.messageService.showErrorMessage('User creation is failed.Please try again');
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })

        );
    });
    updateUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(updateUser),
            switchMap((action) => {
                return this.userService.updateUser(action.user)
                .pipe(
                    map((data) => 
                    {
                        this.store.dispatch(setLoadingSpinner({status:false}));
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage('User is created successfully.');
                        } else {
                            this.messageService.showErrorMessage('User update is failed.');  
                        }
                        // const updatedUser: Update<IUserModel> = 
                        // {
                        //     id: action.user.customerId as number,
                        //     changes: {
                        //         ...action.user
                        //     }
                        // }
                        return updateUserSuccess({ user: action.user });
                   }),
                   catchError((errorRes) => {
                       this.store.dispatch(setLoadingSpinner({ status: false }))
                       const errorMessage = 'Error occurred.User update is failed.Please try again.';
                       this.messageService.showErrorMessage('User update is failed.Please try again');
                       return of(setErrorMessage({ message: errorMessage }));
                   })
                )
            })
        );
    });
    deleteUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deleteUser),
            switchMap((action) => {
                return this.userService.deleteUser(action.id).pipe(map((data) => {
                    if (data.isSuccess) {
                      this.messageService.showSuccessMessage('User is deleted sucessfully.');  
                    }else{
                      this.messageService.showErrorMessage('User delete is failed.');  
                    }
                    return deleteUserSuccess({ id: action.id,total:data.total as number });
                }))
            })
        );
    });
    updateSuccessRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(updateUserSuccess),
                tap((action) => {
                    this.route.navigate(['users']);
                })
            )
        }, {
        dispatch: false
    }
    );
    // getSingleUser = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(ROUTER_NAVIGATION),
    //         filter((r: RouterNavigatedAction) => {
    //             return r.payload.routerState.url.startsWith('/users/details');
    //         }),
    //         map((r: RouterNavigatedAction) => {
    //             let routeNav: any;
    //             routeNav = r;
    //             debugger;
    //             return routeNav.payload.routerState.params.id;
    //         }),
    //         switchMap((id) => {
    //             debugger
    //             return this.userService.getUserById(id).pipe(map((user) => {
    //                 const userData = [{ ...user, id }];
    //                 return loadUsersSuccess({ users: userData });
    //             }));
    //         })
    //     );
    // });
}
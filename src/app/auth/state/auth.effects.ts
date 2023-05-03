import { Actions, createEffect, ofType } from '@ngrx/effects';
import { autoLogOut, autoLogin, dycryptKeyToChangePassword, dycryptKeyToChangePasswordSuccess, loadRoles, loadRolesSuccess, loginFail, loginStart, loginSuccess, loginSuccessfirebase, setChangePassword, setChangePasswordFailed, setChangePasswordSuccess, setCurrentModuleMenuData, setCurrentModuleMenuDataSuccess, setForgotPassword, setForgotPasswordSuccess, setToggle, setToggleSuccess, signupStart, signupSuccess } from './auth.actions';
import { Observable, catchError, exhaustMap, filter, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/commonServices/auth.service';
import { Injectable } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/Shared/shared.action';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/commonServices/toastr.service';
import { changePass } from 'src/app/models/authModels/changePass.model';
import { currentModulePath } from 'src/app/models/commonModels/currentModulePath';
@Injectable()
export class AuthEffects {
    constructor(
        private action$: Actions,
        private authServie: AuthService,
        private messageService: MessageService,
        private store: Store<AppState>,
        private route: Router) {

    }
    setCurrentModuleMenuData$ = createEffect(() => {
        return this.action$.pipe(
            ofType(setCurrentModuleMenuData),
            mergeMap((action) => {
                const currentModulePath:currentModulePath={
                    moduleId:action.currentModulePath.moduleId,
                    modulePath:action.currentModulePath.modulePath,
                    menuId:action.currentModulePath.menuId,
                    menuPath: action.currentModulePath.menuPath,
                    canCreate: action.currentModulePath.canCreate,
                    canView: action.currentModulePath.canView,
                    canEdit: action.currentModulePath.canEdit,
                    canDelete: action.currentModulePath.canDelete
                }
                localStorage.setItem('currentModuleAndPath', JSON.stringify(currentModulePath));
                return of(setCurrentModuleMenuDataSuccess({currentModulePath}));
            })
            )
    })
    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authServie.login(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: '' }))
                        if (data.isSuccess) {
                            const user = this.authServie.formatUser(data);
                            this.authServie.setUserInLocalStorage(user);
                            this.authServie.setModuleInLocalStorage(data.modules);
                            this.messageService.showSuccessMessage('Login successfully.');
                            const currentModulePath:currentModulePath={
                                moduleId: 0,
                                modulePath: '',
                                menuId: 0,
                                menuPath: '',
                                canCreate: false,
                                canView: false,
                                canEdit: false,
                                canDelete: false
                            }
                            return loginSuccess({ user, modules:data.modules,redirect: true,currentModulePath });                            
                        } else {
                            this.messageService.showErrorMessage('Login failed.Please try again.');
                            return loginFail();
                        }
                       
                    }),
                    catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = this.authServie.getErrorMessage(errorRes.error.error.message);
                        this.messageService.showErrorMessage('Login failed.Please try again.');
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            }))
    })
    
    // loginRedirect$ = createEffect(
    //     () => {
    //         return this.action$.pipe(ofType(...[loginSuccess, signupSuccess]),
    //             tap((action) => {
    //                 this.store.dispatch(setErrorMessage({ message: '' }));
    //                 if (action.redirect) {
    //                     this.route.navigate(['/']);
    //                 }

    //             })
    //         )
    //     }, {
    //     dispatch: false
    // }
    // );
    loginRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(loginSuccess),
                tap((action) => {
                    this.store.dispatch(setErrorMessage({ message: '' }));
                    if (action.redirect) {
                        this.route.navigate(['/']);
                    }

                })
            )
        }, {
        dispatch: false
    }
    );
    signupSuccessRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(signupSuccess),
                tap((action) => {
                    this.store.dispatch(setErrorMessage({ message: '' }));
                    
                        this.route.navigate(['/auth/login']);                    

                })
            )
        }, {
        dispatch: false
    }
    );
    loginFailRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(loginFail),
                tap((action) => {                   
                        this.route.navigate(['auth']); 
                })
            )
        }, {
        dispatch: false
    }
    );
    // signUpRedirect$=createEffect(
    //     ()=>{
    //     return this.action$.pipe(ofType(signupSuccess),
    //     tap((action)=>{
    //         this.store.dispatch(setErrorMessage({ message: '' }));
    //         this.route.navigate(['/']);
    //     })
    //     )
    // },{
    //     dispatch:false
    // }
    // );
    // signUpFirebase$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(signupStart),
    //         exhaustMap((action) => {
    //             return this.authServie.signup(action.email, action.password).pipe(
    //                 map((data) => {
    //                     this.store.dispatch(setLoadingSpinner({ status: false }))
    //                     const user = this.authServie.formatFirebaseUser(data);
    //                     return signupSuccess({ user, redirect: true });
    //                 }), catchError((errorRes) => {
    //                     this.store.dispatch(setLoadingSpinner({ status: false }))
    //                     const errorMessage = this.authServie.getErrorMessage(errorRes.error.error.message);
    //                     return of(setErrorMessage({ message: errorMessage }));
    //                 })
    //             )
    //         })
    //     );
    // });
    signUp$ = createEffect(() => {
        return this.action$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authServie.signup(action.user).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.messageService.showSuccessMessage('User registration is completed.');
                        //const user = this.authServie.formatUser(data);
                        return signupSuccess();
                    }), catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = this.authServie.getErrorMessage(errorRes.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })
        );
    });

    sendEmailToChangePassword$ = createEffect(() => {
        return this.action$.pipe(
            ofType(setForgotPassword),
            exhaustMap((action) => {
                return this.authServie.sendEmailToChangePassword(action.email).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));
                        debugger
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage('Email is sent', 'Email!');
                        } else {
                            this.messageService.showErrorMessage('Email is failed to sent.Please try again.');
                        }

                        return setForgotPasswordSuccess({ isSent: true });
                    }), catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.messageService.showErrorMessage('Failed to send the message.Please try again.');
                        const errorMessage = this.authServie.getErrorMessage(errorRes.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })
        );
    });
    decryptPasswordSuccess$ = createEffect(() => {
        return this.action$.pipe(
            ofType(dycryptKeyToChangePassword)
            , exhaustMap((action) => {
                return this.authServie.decryptPasswordKey(action.key).pipe(
                    map((data: any) => {
                        debugger
                        let userPass = new changePass(0);
                        if (data.isSuccess) {
                             userPass = new changePass(data.user.customerID, '',data.user.loginID);
                             this.messageService.showInfoMessage(data.message, 'Info!');
                        } else {
                            this.messageService.showErrorMessage(data.message, 'Warning!');
                        }
                        return dycryptKeyToChangePasswordSuccess({ userPass });
                    })
                );
            })
        );
    });
    changePassword$ = createEffect(() => {
        return this.action$.pipe(
            ofType(setChangePassword)
            , exhaustMap((action) => {
                return this.authServie.changePassword(action.model).pipe(
                    map((data: any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage(data.message);
                            return setChangePasswordSuccess();
                        } else {
                            this.messageService.showErrorMessage('Failed to change password.Please try again.');
                            return setChangePasswordFailed();
                        }
                        
                    }), catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.messageService.showErrorMessage('Failed to change the message.Please try again.');
                        const errorMessage = this.authServie.getErrorMessage(errorRes.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                );
            })
        );
    });
    changePasswordSuccessRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(setChangePasswordSuccess),
                tap((action) => {
                    this.route.navigate(['auth']);
                })
            )
        }, {
        dispatch: false
    }
    );
    autoLogin$ = createEffect(() => {
        return this.action$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authServie.getUserFromLocalStorage();
                const modules = this.authServie.getModulesFromLocalStorage();
                const currentModulePath=this.authServie.getCurrentModulePathFromLocalStorage();
                return of(loginSuccess({ user,modules, redirect: false,currentModulePath }));
            })
        );
    }
    );
    logout$ = createEffect(() => {
        return this.action$.pipe(
            ofType(autoLogOut),
            map((action) => {
                this.authServie.logout();
                this.route.navigate(['auth']);
            }
            ));
    }, { dispatch: false });
    //To update any value to every componet, mergeMap is used
    setToggleEffect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(setToggle),
                mergeMap((action) => {
                    const isToggle = action.isToggle;
                    this.authServie.setToggleDataInLocalStorage(isToggle);
                    return of(setToggleSuccess({ isToggle: isToggle }));
                })
            )
        }
    );
    loadRoles$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadRoles),
            mergeMap((action) => {
                return this.authServie.getRoles().pipe(map((roles) => {
                    return loadRolesSuccess({ roles })
                }));
            })
        );
    });
}
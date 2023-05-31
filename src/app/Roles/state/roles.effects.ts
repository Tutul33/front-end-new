import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { addRole, addRoleFail, addRoleSuccess, deleteRole, deleteRoleSuccess, loadRole, updateRole, updateRoleSuccess } from "src/app/Roles/state/roles.actions";
import { MessageService } from "src/app/services/commonServices/toastr.service";
import { RoleService } from "src/app/services/roleServices/role.service";
import { AppState } from "src/app/store/app.state";
import { loadRoleSuccess } from "./roles.actions";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.action";
import { Injectable } from "@angular/core";
@Injectable()
export class RoleEffects{
    constructor(
        private action$: Actions,
        private roleService: RoleService,
        private store: Store<AppState>,
        private route: Router,
        private messageService:MessageService) 
    {
    }
    loadRoles$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadRole),
            mergeMap((action) => {
                return this.roleService.getRoles(action.search).pipe(map((roles) => {
                    return loadRoleSuccess({ roles })
                }));
            })
        );
    });

    addRole$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addRole),           
            exhaustMap((action) => {
                //var postModel=this.roleService.FormData(action.user,action.uploadedFile);
                return this.roleService.addRole(action.role).pipe(
                    map((data:any) => {
                        var result=data.result;
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: '' }))
                        if (result.isSuccess) {
                            this.messageService.showSuccessMessage('Role is created successfully.');
                            const role = { ...action.role, id: data.roleId }
                            return addRoleSuccess({ role });                            
                        } else {
                            this.messageService.showErrorMessage('Role creation is failed.Please try again.');
                            return addRoleFail();
                        }
                       
                    }),
                    catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = 'Error occurred.Role creation is failed.Please try again.';
                        this.messageService.showErrorMessage('Role creation is failed.Please try again');
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })

        );
    });
    updateRole$ = createEffect(() => {
        return this.action$.pipe(
            ofType(updateRole),
            switchMap((action) => {
                //var postModel=this.roleService.FormData(action.user,action.uploadedFile);
                return this.roleService.updateRole(action.role)
                .pipe(
                    map((data:any) => 
                    {
                        this.store.dispatch(setLoadingSpinner({status:false}));
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage('User is updated successfully.');
                        } else {
                            this.messageService.showErrorMessage('User update is failed.');  
                        }
                        return updateRoleSuccess({ role: action.role });
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
    deleteRole$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deleteRole),
            switchMap((action) => {
                return this.roleService.deleteRole(action.id).pipe(map((data:any) => {
                    if (data.isSuccess) {
                      this.messageService.showSuccessMessage('Role is deleted sucessfully.');  
                    }else{
                      this.messageService.showErrorMessage('Role delete is failed.');  
                    }
                    return deleteRoleSuccess({ id: action.id,total:data.total as number });
                }))
            })
        );
    });
    updateSuccessRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(updateRoleSuccess),
                tap((action) => {
                    this.route.navigate(['roles']);
                })
            )
        }, {
        dispatch: false
    }
    );
}


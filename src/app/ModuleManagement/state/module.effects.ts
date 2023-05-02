import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { MessageService } from "src/app/services/commonServices/toastr.service";
import { moduleService } from "src/app/services/moduleServices/module.service";
import { AppState } from "src/app/store/app.state";
import { addMenu, addMenuSuccess, addModule, addModuleFail, addModuleSuccess, deleteMenu, deleteMenuSuccess, deleteModule, deleteModuleSuccess, loadMenu, loadMenuPermission, loadMenuPermissionSuccess, loadMenuSuccess, loadModule, loadModuleSuccess, updateMenu, updateMenuSuccess, updateModule, updateModuleSuccess } from "./module.actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.action";

@Injectable()
export class ModuleEffects{
    constructor(
        private action$: Actions,
        private moduleService: moduleService,
        private store: Store<AppState>,
        private route: Router,
        private messageService:MessageService) {

    }
    //Modules
    loadModules$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadModule),
            mergeMap((action) => {
                return this.moduleService.getModules(action.search).pipe(map((module) => {
                    return loadModuleSuccess({ module })
                }));
            })
        );
    });
    addModule$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addModule),           
            exhaustMap((action) => {
                return this.moduleService.addModule(action.module).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: '' }))
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage('Module is created successfully.');
                            const module = { ...action.module, id: data.moduleId }
                            return addModuleSuccess({ module });                            
                        } else {
                            this.messageService.showErrorMessage('Module creation is failed.Please try again.');
                            return addModuleFail();
                        }
                       
                    }),
                    catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = 'Error occurred.Module creation is failed.Please try again.';
                        this.messageService.showErrorMessage('Module creation is failed.Please try again');
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })

        );
    });
    updateModule$ = createEffect(() => {
        return this.action$.pipe(
            ofType(updateModule),
            switchMap((action) => {
                return this.moduleService.updateModule(action.module)
                .pipe(
                    map((data) => 
                    {
                        this.store.dispatch(setLoadingSpinner({status:false}));
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage('Module is updated successfully.');
                        } else {
                            this.messageService.showErrorMessage('Module update is failed.');  
                        }                        
                        return updateModuleSuccess({ module: action.module });
                   }),
                   catchError((errorRes) => {
                       this.store.dispatch(setLoadingSpinner({ status: false }))
                       const errorMessage = 'Error occurred.Module update is failed.Please try again.';
                       this.messageService.showErrorMessage('Module update is failed.Please try again');
                       return of(setErrorMessage({ message: errorMessage }));
                   })
                )
            })
        );
    });
    deleteModule$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deleteModule),
            switchMap((action) => {
                return this.moduleService.deleteModule(action.id).pipe(map((data) => {
                    if (data.isSuccess) {
                      this.messageService.showSuccessMessage('Module is deleted sucessfully.');  
                    }else{
                      this.messageService.showErrorMessage('Module delete is failed.');  
                    }
                    return deleteModuleSuccess({ id: action.id,total:data.total as number });
                }))
            })
        );
    });
    updateModuleSuccessRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(updateModuleSuccess),
                tap((action) => {
                    this.route.navigate(['modules']);
                })
            )
        }, {
        dispatch: false
    }
    );   
    
    //Menus
    loadMenus$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadMenu),
            mergeMap((action) => {
                return this.moduleService.getMenus(action.search).pipe(map((menu) => {
                    return loadMenuSuccess({ menu })
                }));
            })
        );
    });
    addMenu$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addMenu),           
            exhaustMap((action) => {
                return this.moduleService.addMenu(action.menu).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: '' }))
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage('Menu is created successfully.');
                            const menu = { ...action.menu, id: data.menuId }
                            return addMenuSuccess({ menu });                            
                        } else {
                            this.messageService.showErrorMessage('Menu creation is failed.Please try again.');
                            return addModuleFail();
                        }
                       
                    }),
                    catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = 'Error occurred.Menu creation is failed.Please try again.';
                        this.messageService.showErrorMessage('Menu creation is failed.Please try again');
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })

        );
    });
    updateMenu$ = createEffect(() => {
        return this.action$.pipe(
            ofType(updateMenu),
            switchMap((action) => {
                return this.moduleService.updateMenu(action.menu)
                .pipe(
                    map((data) => 
                    {
                        this.store.dispatch(setLoadingSpinner({status:false}));
                        if (data.isSuccess) {
                            this.messageService.showSuccessMessage('Menu is created successfully.');
                        } else {
                            this.messageService.showErrorMessage('Menu update is failed.');  
                        }
                        
                        return updateMenuSuccess({ menu: action.menu });
                   }),
                   catchError((errorRes) => {
                       this.store.dispatch(setLoadingSpinner({ status: false }))
                       const errorMessage = 'Error occurred.Menu update is failed.Please try again.';
                       this.messageService.showErrorMessage('Menu update is failed.Please try again');
                       return of(setErrorMessage({ message: errorMessage }));
                   })
                )
            })
        );
    });
    deleteMenu$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deleteMenu),
            switchMap((action) => {
                return this.moduleService.deleteMenu(action.id).pipe(map((data) => {
                    if (data.isSuccess) {
                      this.messageService.showSuccessMessage('Menu is deleted sucessfully.');  
                    }else{
                      this.messageService.showErrorMessage('Menu delete is failed.');  
                    }
                    return deleteMenuSuccess({ id: action.id,total:data.total as number });
                }))
            })
        );
    });
    updateMenuSuccessRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(updateMenuSuccess),
                tap((action) => {
                    this.route.navigate(['modules/menus']);
                })
            )
        }, {
        dispatch: false
    }
    );  
    //
    loadMenuPermissions$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadMenuPermission),
            mergeMap((action) => {
                return this.moduleService.getMenuPermissions(action.search).pipe(map((menuPermission) => {
                    return loadMenuPermissionSuccess({ menuPermission })
                }));
            })
        );
    }); 
}
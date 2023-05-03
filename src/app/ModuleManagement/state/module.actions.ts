import { createAction, props } from "@ngrx/store";
import { SearchModel } from "src/app/models/commonModels/search.model";
import { Menu, MenuPermission, SearchMenuPermissions } from "src/app/models/menuModels/menu.model";
import { MenuModels, MenuPermissionModels } from "src/app/models/menuModels/menuSearch.model";
import { ModulesModels } from "src/app/models/moudleNodels/moduleSearch.model";
import { Modules } from "src/app/models/moudleNodels/modules.model";
//Module Variable
export const ADD_MODULE="[MODULE Page] add MODULE";
export const ADD_MODULE_SUCCESS="[MODULE Page] add MODULE success";
export const ADD_MODULE_FAIL="[MODULE Page] add MODULE FAILS";
export const UPDATE_MODULE="[MODULE Page] UPDATE MODULE";
export const UPDATE_MODULE_SUCCESS="[MODULE Page] UPDATE MODULE success";
export const DELETE_MODULE="[MODULE Page] DELETE MODULE ";
export const DELETE_MODULE_SUCCESS="[MODULE Page] DELETE MODULE success";
export const LOAD_MODULE="[MODULE Page] LOAD MODULE ";
export const LOAD_MODULE_SUCCESS="[MODULE Page] LOAD MODULE success";

//Menu Variable
export const ADD_MENU="[Menu Page] add menu";
export const ADD_MENU_SUCCESS="[Menu Page] add menu success";
export const UPDATE_MENU="[Menu Page] UPDATE menu";
export const UPDATE_MENU_SUCCESS="[Menu Page] UPDATE menu success";
export const DELETE_MENU="[Menu Page] DELETE menu ";
export const DELETE_MENU_SUCCESS="[Menu Page] DELETE menu success";
export const LOAD_MENU="[Menu Page] LOAD menu ";
export const LOAD_MENU_SUCCESS="[Menu Page] LOAD menu success";

//Menu Variable
export const ADD_MENU_PERMISSION="[MENU_PERMISSION Page] add MENU_PERMISSION";
export const ADD_MENU_PERMISSION_SUCCESS="[MENU_PERMISSION Page] add MENU_PERMISSION success";
export const UPDATE_MENU_PERMISSION="[MENU_PERMISSION Page] UPDATE MENU_PERMISSION";
export const UPDATE_MENU_PERMISSION_SUCCESS="[MENU_PERMISSION Page] UPDATE MENU_PERMISSION success";
export const DELETE_MENU_PERMISSION="[MENU_PERMISSION Page] DELETE MENU_PERMISSION ";
export const DELETE_MENU_PERMISSION_SUCCESS="[MENU_PERMISSION Page] DELETE MENU_PERMISSION success";
export const LOAD_MENU_PERMISSION="[MENU_PERMISSION Page] LOAD MENU_PERMISSION ";
export const LOAD_MENU_PERMISSION_SUCCESS="[MENU_PERMISSION Page] LOAD MENU_PERMISSION success";

//Menu Actions
export const addMenu=createAction(ADD_MENU,props<{menu:Menu}>())
export const addMenuSuccess=createAction(ADD_MENU_SUCCESS,props<{menu:Menu}>())

export const updateMenu=createAction(UPDATE_MENU,props<{menu:Menu}>())
export const updateMenuSuccess=createAction(UPDATE_MENU_SUCCESS,props<{menu:Menu}>())

export const deleteMenu=createAction(DELETE_MENU,props<{id:number}>())
export const deleteMenuSuccess=createAction(DELETE_MENU_SUCCESS,props<{id:number,total:number}>())

export const loadMenu=createAction(LOAD_MENU,props<{search:SearchModel}>())
export const loadMenuSuccess=createAction(LOAD_MENU_SUCCESS,props<{menu:MenuModels}>())

//Module Actions
export const addModule=createAction(ADD_MODULE,props<{module:Modules}>())
export const addModuleSuccess=createAction(ADD_MODULE_SUCCESS,props<{module:Modules}>())
export const addModuleFail=createAction(ADD_MODULE_FAIL)

export const updateModule=createAction(UPDATE_MODULE,props<{module:Modules}>())
export const updateModuleSuccess=createAction(UPDATE_MODULE_SUCCESS,props<{module:Modules}>())

export const deleteModule=createAction(DELETE_MODULE,props<{id:number}>())
export const deleteModuleSuccess=createAction(DELETE_MODULE_SUCCESS,props<{id:number,total:number}>())

export const loadModule=createAction(LOAD_MODULE,props<{search:SearchModel}>())
export const loadModuleSuccess=createAction(LOAD_MODULE_SUCCESS,props<{module:ModulesModels}>())

//Menu Permission
//Module Actions
export const addMenuPermission=createAction(ADD_MENU_PERMISSION,props<{menuPermission:MenuPermission}>())
export const addMenuPermissionSuccess=createAction(ADD_MENU_PERMISSION_SUCCESS,props<{menuPermission:MenuPermission}>())
export const addMenuPermissionFail=createAction(ADD_MODULE_FAIL)

export const updateMenuPermission=createAction(UPDATE_MENU_PERMISSION,props<{menuPermission:MenuPermission}>())
export const updateMenuPermissionSuccess=createAction(UPDATE_MENU_PERMISSION_SUCCESS,props<{menuPermission:MenuPermission}>())

export const deleteMenuPermission=createAction(DELETE_MENU_PERMISSION,props<{id:number}>())
export const deleteMenuPermissionSuccess=createAction(DELETE_MENU_PERMISSION_SUCCESS,props<{id:number,total:number}>())

export const loadMenuPermission=createAction(LOAD_MENU_PERMISSION,props<{search:SearchMenuPermissions}>())
export const loadMenuPermissionSuccess=createAction(LOAD_MENU_PERMISSION_SUCCESS,props<{menuPermission:MenuPermissionModels}>())
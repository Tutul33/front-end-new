import { createAction, props } from "@ngrx/store";
import { changePass } from "src/app/models/authModels/changePass.model";
import { Modules } from "../../models/moudleNodels/modules.model";
import { User, UserModel } from "src/app/models/userModels/user.model";
import { currentModulePath } from "src/app/models/commonModels/currentModulePath";
import { Role } from "src/app/models/commonModels/role.model";
export const LOGIN_START = '[Auth page] login start';
export const LOGIN_SUCCESS = '[Auth page] login success';
export const LOGIN_FAIL = '[Auth page] login fail';
export const SIGNUP_START = '[Auth page] SIGN UP START';
export const SIGNUP_SUCCESS = '[Auth page] SIGN UP SUCCESS';
export const AUTO_LOGIN_ACTION = '[Auth page] Auto Login';
export const LOGIN_OUT_ACTION = '[Auth page] Auto Log OUT';
export const SET_TOGGLE = '[Auth state] set toggle';
export const SET_TOGGLE_SUCCESS = '[Auth state] set toggle success';
export const SET_FORGOT_PASSWORD = '[Auth state] forgot password';
export const SET_FORGOT_PASSWORD_SUCCESS = '[Auth state] forgot password success';
export const SET_DYCRYPT_KEY_START = '[Auth state] decrypt key start';
export const SET_DYCRYPT_KEY_SUCCESS = '[Auth state] decrypt key success';
export const SET_CHANGE_PASSWORD_START = '[Auth state] change password start';
export const SET_CHANGE_PASSWORD_SUCCESS = '[Auth state] change password success';
export const SET_CHANGE_PASSWORD_FAILED = '[Auth state] change password failed';
export const SET_MODULE_MENU_DATA = '[Auth state] Set module and menu path';
export const SET_MODULE_MENU_DATA_SUCCESS = '[Auth state] Set module and menu path SUCCESS';
export const GET_ROLE = '[users state] Load role data';
export const GET_ROLE_SUCCESS = '[users state] Load role data success';

export const loginStartfirebase = createAction(LOGIN_START, props<{ email: string, password: string }>());
export const loginSuccessfirebase = createAction(LOGIN_SUCCESS, props<{ user: User | null, redirect: boolean }>());

export const loginStart = createAction(LOGIN_START, props<{ email: string, password: string }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<
    { user: UserModel | null,
         modules: Modules[], 
         redirect: boolean,
        currentModulePath:currentModulePath
        }>());
export const loginFail = createAction(LOGIN_FAIL);

export const signupStartFirebase = createAction(SIGNUP_START, props<{ email: string, password: string }>());
export const signupSuccessFirebase = createAction(SIGNUP_SUCCESS, props<{ user: User, redirect: boolean }>());

export const signupStart = createAction(SIGNUP_START, props<{ user: UserModel }>());
//export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{ user: UserModel, redirect: boolean }>());
export const signupSuccess = createAction(SIGNUP_SUCCESS);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogOut = createAction(LOGIN_OUT_ACTION);

export const setToggle = createAction(SET_TOGGLE, props<{ isToggle: boolean }>());
export const setToggleSuccess = createAction(SET_TOGGLE_SUCCESS, props<{ isToggle: boolean }>());

export const setForgotPassword = createAction(SET_FORGOT_PASSWORD, props<{ email: string }>());
export const setForgotPasswordSuccess = createAction(SET_FORGOT_PASSWORD_SUCCESS, props<{ isSent: boolean }>());

export const dycryptKeyToChangePassword = createAction(SET_DYCRYPT_KEY_START, props<{ key: string }>());
export const dycryptKeyToChangePasswordSuccess = createAction(SET_DYCRYPT_KEY_SUCCESS, props<{ userPass: changePass }>());

export const setChangePassword = createAction(SET_CHANGE_PASSWORD_START, props<{ model: changePass }>());
export const setChangePasswordSuccess = createAction(SET_CHANGE_PASSWORD_SUCCESS);
export const setChangePasswordFailed = createAction(SET_CHANGE_PASSWORD_FAILED);

export const setCurrentModuleMenuData = createAction(SET_MODULE_MENU_DATA,
    props<{currentModulePath:currentModulePath}>());
export const setCurrentModuleMenuDataSuccess = createAction(SET_MODULE_MENU_DATA_SUCCESS,
        props<{currentModulePath:currentModulePath}>());

        export const loadRoles = createAction(GET_ROLE);
        export const loadRolesSuccess = createAction(GET_ROLE_SUCCESS,props<{roles:Role[]}>());




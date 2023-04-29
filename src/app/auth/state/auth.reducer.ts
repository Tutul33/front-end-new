import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { autoLogOut, dycryptKeyToChangePasswordSuccess, loginSuccess, setCurrentModuleMenuData, setCurrentModuleMenuDataSuccess, setForgotPasswordSuccess, setToggleSuccess, signupSuccess } from "./auth.actions";

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
            modules:action.modules,
            currentModulePath:action.currentModulePath
        }
    }),
    // on(signupSuccess, (state, action) => {
    //     return {
    //         ...state,
    //         user: action.user
    //     }
    // })
    // ,
    on(autoLogOut, (state) => {
        return {
            ...state,
            user: null
        }
    }),
    on(setToggleSuccess, (state,action) => {
        return {
            ...state,
            isToggle: action.isToggle
        }
    }),
    on(setForgotPasswordSuccess, (state,action) => {
        return {
            ...state,
            isSent: action.isSent
        }
    })
    ,
    on(dycryptKeyToChangePasswordSuccess, (state,action) => {
        return {
            ...state,
            userPass: action.userPass
        }
    })
    ,
    on(setCurrentModuleMenuDataSuccess, (state,action) => {
        return {
            ...state,
            currentModulePath: action.currentModulePath
        }
    })
);

export function AuthReducer(state: any, action: any) {
    return _authReducer(state, action);
}
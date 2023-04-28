import { createReducer, on } from "@ngrx/store"
import { initialState } from "./module.state";
import { loadMenuSuccess } from "./module.actions";

 export const moduleReducer=createReducer(initialState,
    // on(
    //    loadMenuSuccess,
    //    (state, _action) => {        
    //     return {
    //         ...state,
    //         menus: _action,
    //         total:0
    //     }
    //    }
    //  )
 );
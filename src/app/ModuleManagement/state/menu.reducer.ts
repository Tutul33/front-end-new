import { createReducer, on } from "@ngrx/store"
import { initialState } from "./menu.state";
import { loadMenuSuccess } from "./menu.actions";

 export const menuReducer=createReducer(initialState,
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
import { createReducer,on } from "@ngrx/store";
import { initialState } from "./counterState";
import { changeDesignation, customIncrement, decrement, increment, reset } from "./counter.action";


const _counterReducer = createReducer(
    initialState,
    on(increment,(state:any)=>{
        return {
               ...state,
               counter:state.counter+1,   
           }
    }),
    on(decrement,(state:any)=>{
        return {
               ...state,
               counter:state.counter-1,   
           }
    }),
    on(reset,(state:any)=>{
        return {
               ...state,
               counter:0,   
           }
    }),
    on(customIncrement,(state,action)=>{
        return{
            ...state,
            counter:state.counter+action.count
        }
    }),
    on(changeDesignation,(state,action)=>{
        return{
            ...state,  
            designation:'Modified - '+state.designation      
        }
    })
);
export function counterReducer(state:any,action:any){
    return _counterReducer(state,action);
}


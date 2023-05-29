import { createReducer,on } from "@ngrx/store";
import { initialState } from "./role.state";
import { addRoleSuccess, deleteRoleSuccess, loadRoleSuccess, updateRoleSuccess } from "./roles.actions";
import { Role } from "src/app/models/commonModels/role.model";

export const _roleReducer=createReducer(
    initialState,
    on(addRoleSuccess,(state,action)=>{
        let role = { ...action.role };
        return {
            ...state,
            modules: [...state.roles, role],
            total:action.role.total as number
        }
    }),
    on(updateRoleSuccess, (state, action) => {  
        const updatedRoles = state.roles.map((role) => {
            return action.role.roleId === role.roleId ? action.role : role;
        });
        return {
            ...state,
            roles: updatedRoles
        }
    }),
    on(deleteRoleSuccess, (state, { id,total }) => {
        const updatedRoles = state.roles.filter(role => {
            return role.roleId != id;
        });
        return {
            ...state,
            roles: updatedRoles,
            total:total
        }
    }),
    on(loadRoleSuccess, (state, action) => {        
        return {
            ...state,
            roles: action.roles.roles as Role[],
            total:action.roles.total as number
        }
    }),
    );
export function roleReducer(state: any, action: any) {
        return _roleReducer(state, action);
     }



import { createReducer, on } from "@ngrx/store";
//import { initialState, userAdapter } from "./users.state";
import { initialState } from "./users.state";
import { addUser, addUserSuccess, deleteUserSuccess, loadUsersSuccess, updateUserSuccess } from "./users.action";

const _usersReducer = createReducer(initialState,
    on(addUserSuccess,(state,action)=>{
        let user = { ...action.user };
        return {
            ...state,
            users: [...state.users, user]
        }
        //return userAdapter.addOne(action.user,state);
    }),
    on(updateUserSuccess, (state, action) => {  
        const updatedUsers = state.users.map((user) => {
            return action.user.customerId === user.customerId ? action.user : user;
        });
        return {
            ...state,
            users: updatedUsers
        }
        // return userAdapter.updateOne(
        //     action.user,
        //     state
        //     );
    }),
    on(deleteUserSuccess, (state, { id,total }) => {
        const updatedUsers = state.users.filter(user => {
            return user.customerId != id;
        });
        return {
            ...state,
            users: updatedUsers,
            total:total
        }
        //return userAdapter.removeOne(id,state);
    }),
    on(loadUsersSuccess, (state, action) => {        
        return {
            ...state,
            users: action.users.userList,
            total:action.users.total
        }
        //return userAdapter.setAll(action.users,state);
    })
    );
export function userReducer(state: any, action: any) {
    return _usersReducer(state, action);
}
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.state";

export const USER_STATE_NAME = 'users';
const getUserState = createFeatureSelector<UsersState>(USER_STATE_NAME);
// export const userSelectors=userAdapter.getSelectors();

// export const getUsers = createSelector(getPostState, userSelectors.selectAll);
// export const getUserEntities = createSelector(getPostState, userSelectors.selectEntities);
export const getUsers = createSelector(getUserState, (state)=>{
  return state.users;
});
export const getRoles = createSelector(getUserState, (state)=>{
  return state.roles;
});
export const getUserTotal = createSelector(getUserState, (state)=>{
  return state.total;
});
export const getUserAll = createSelector(getUsers,getUserTotal, (users,total)=>{
  return {users,total};
});

// export const getUserById =(id:number)=>(
//   createSelector(
//     getUserEntities,
//     (users) => {
//       return users ? users[id] : null;
//     }
//   ));
//   export const getUserAll =
//     createSelector(
//       getUsers,
//       (users) => {
//         return users.sort((a, b) => ((a.customerId as number) > (b.customerId as number) ? -1 : 1));
//       }
//     );
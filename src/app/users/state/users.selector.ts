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
export const getUserTotal = createSelector(getUserState, (state)=>{
  return state.total;
});
export const getUserAll = createSelector(getUsers,getUserTotal, (userList,total)=>{  
  const sortedUsers= [...userList].sort((a, b) => ((a.customerId as number) > (b.customerId as number) ? -1 : 1));
  return {users:sortedUsers,total};
});

import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { IUserModel, UserModel } from "src/app/models/user.model";

// export interface UsersState extends EntityState<IUserModel>{}
// export const userAdapter=createEntityAdapter<IUserModel>();
// export const initialState: UsersState = userAdapter.getInitialState();

export interface UsersState {
    users: IUserModel[];
    total:number;
  }
  
  export const initialState: UsersState = {
    users: [],
    total:0
  };
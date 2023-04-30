import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Role } from "src/app/models/commonModels/role.model";
import { IUserModel, UserModel } from "src/app/models/userModels/user.model";

// export interface UsersState extends EntityState<IUserModel>{}
// export const userAdapter=createEntityAdapter<IUserModel>();
// export const initialState: UsersState = userAdapter.getInitialState();

export interface UsersState {
    users: IUserModel[];
    total:number;
    roles:Role[];
  }
  
  export const initialState: UsersState = {
    users: [],
    total: 0,
    roles: []
  };
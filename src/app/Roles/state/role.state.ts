import { Role } from "src/app/models/commonModels/role.model";

export interface RoleState{
    roles:Role[];
    total:number;
}
export const initialState:RoleState={
    roles: [],
    total: 0
}
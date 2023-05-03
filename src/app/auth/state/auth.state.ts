import { changePass } from "src/app/models/authModels/changePass.model";
import { Modules } from "../../models/moudleNodels/modules.model";
import { User, UserModel } from "src/app/models/userModels/user.model";
import { currentModulePath } from "src/app/models/commonModels/currentModulePath";
import { Role } from "src/app/models/commonModels/role.model";

export interface AuthState {
    //user: User | null;
    user: UserModel | any;
    isToggle: boolean;
    isSent: boolean;
    userPass: changePass | null;
    modules: Modules[] | any;
    currentModulePath:currentModulePath|any;
    roles:Role[];
}
export const initialState: AuthState = {
    user: null,
    isToggle: false,
    isSent: false,
    userPass: null,
    modules: [],
    currentModulePath: null,
    roles: []
}
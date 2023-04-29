import { changePass } from "src/app/models/authModels/changePass.model";
import { Modules } from "../../models/moudleNodels/modules.model";
import { User, UserModel } from "src/app/models/userModels/user.model";

export interface AuthState {
    //user: User | null;
    user: UserModel | any;
    isToggle: boolean;
    isSent: boolean;
    userPass: changePass | null;
    modules: Modules[] | any;
    currentModuleId: number | 0;
    currentModulePath: string | "";
    currentMenuId: number | 0;
    currentMenuPath: string | "";
    canCreate: boolean | false;
    canView: boolean | false;
    canEdit: boolean | false;
    canDelete: boolean | false;
}
export const initialState: AuthState = {
    user: null,
    isToggle: false,
    isSent: false,
    userPass: null,
    modules: [],
    currentModuleId: 0,
    currentModulePath: "",
    currentMenuId: 0,
    currentMenuPath: "",
    canCreate: false,
    canView: false,
    canEdit: false,
    canDelete: false
}
import { changePass } from "src/app/models/authModels/changePass.model";
import { User, UserModel } from "src/app/models/userModels/user.model";

export interface AuthState {
    //user: User | null;
    user: UserModel | any;
    isToggle: boolean;
    isSent: boolean;
    userPass: changePass | null;
}
export const initialState: AuthState = {
    user: null,
    isToggle: false,
    isSent: false,
    userPass: null
}
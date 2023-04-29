import { Modules } from "../../models/moudleNodels/modules.model";

export interface Login{    
    email:string,
    password:string
}
export interface LoginModel{
    token?: string;
    loginId?: number;
    customerId?: number;
    userName?: string;
    password: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    phone: string;
    isSuccess?: boolean;
    expireDate?: Date;
    modules:Modules[];
    roleName:string;
}
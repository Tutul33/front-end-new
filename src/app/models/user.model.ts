import { PagingModel } from "./paging.model";
import { SearchModel } from "./search.model";

export class User {
    constructor(
        private eamil: string,
        private token: string,
        private localId: string,
        private expirationDate: Date,
        private firstName: string,
        private lastName: string,
        private phone: string,
    ) {

    }
    get expireDate() {
        return this.expirationDate;
    }
    get userToken() {
        return this.token;
    }
}
export interface UserModels{
    userList:IUserModel[];
    total:number;
}
export interface IUserModel{
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
    total?:number;
}
export class UserModel{
    constructor(
    private token: string,
    private loginId: number,
    private customerId: number,
    private userName: string,
    private password: string,
    private firstName: string,
    private lastName: string,
    private fullName: string,
    private email: string,
    private phone: string,
    private isSuccess: boolean,
    private expireDate: Date,
    ) {

    }
    get expireDateData() {
        return this.expireDate;
    }
    get userToken() {
        return this.token;
    }
    get userfirstName() {
        return this.firstName;
    }
    get userLastName() {
        return this.lastName;
    }
    get userFullName() {
        return this.fullName;
    }
}
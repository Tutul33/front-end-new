import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponseData } from "../models/AuthResponseData";
import { Observable, of } from "rxjs";
import { IUserModel, User, UserModel } from "../models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { autoLogOut } from "../auth/state/auth.actions";
import { changePass } from "../models/changePass.model";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    timeOutInterval: any;
    constructor(private http: HttpClient,private store:Store<AppState>) {

    }
    loginFirebase(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
            { email, password, returnSecureToken: true }
        );
    }
    login(email: string, password: string): Observable<IUserModel> {
        return this.http.post<IUserModel>(
            `http://localhost:5207/api/login/userlogin`,
            { userName:email, password}
        );
    }
    
    signupFirbase(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
            { email, password, returnSecureToken: true }
        );
    }
    signup(model:UserModel): Observable<IUserModel> {
        return this.http.post<IUserModel>(
            `http://localhost:5207/api/login/UserRegistration`,
            model
        );
    }
    sendEmailToChangePassword(email: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            `http://localhost:5207/api/Login/SendEmailToChangePassword`,
            { email }
        );
    }
    decryptPasswordKey(key: string): Observable<any> {
        return this.http.get<any>(
            `http://localhost:5207/api/Login/DeycryptLoginPasswordKey/${ key }`
            
        );
    }
    changePassword(model: changePass): Observable<any> {
        return this.http.post<any>(
            `http://localhost:5207/api/Login/ChangePassword`,model          
        );
    }
    formatFirebaseUser(data: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
        const user = new User(data.email, data.idToken, data.localId, expirationDate,'','','');
        return user;
    }
    formatUser(data: IUserModel) {
        //const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
        const user=new UserModel(
            data.token as string, 
            data.loginId as number, 
            data.customerId as number,
             data.userName as string,
            data.password,
             data.firstName,
             data.lastName,
             data.fullName as string,
             data.email,
             data.phone,
             data.isSuccess as boolean,
             data.expireDate as Date);
        return user;
    }
    getErrorMessage(message: string) {
        switch (message) {
            case 'EMAIL_NOT_FOUND':
                return 'Email not found';
            case 'INVALID_PASSWORD':
                return 'Invalid password';
            case 'EMAIL_EXISTS':
                return 'Email already exists.';
            default:
                return 'Unknown error occured.Please try again.';
        }
    }
    setUserInLocalStorageFirebase(user: User) {
        localStorage.setItem('userData', JSON.stringify(user));
        this.runTimeOutIntervalFirebase(user);
    }
    setUserInLocalStorage(user: UserModel) {
        localStorage.setItem('userData', JSON.stringify(user));
        this.runTimeOutInterval(user);
    }
    setToggleDataInLocalStorage(isToggle: boolean) {
        localStorage.setItem('sb|sidebar-toggle', JSON.stringify(isToggle));
    }
    runTimeOutInterval(user: UserModel) {
        const todaysDate = new Date().getTime();
        //const expirationDate = user.expireDate.getDate();
        const timeInterval = new Date(user.expireDateData).getDate() - todaysDate;
        this.timeOutInterval = setTimeout(() => {
            this.store.dispatch(autoLogOut());
        }, timeInterval)
    }
    runTimeOutIntervalFirebase(user: User) {
        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getDate();
        const timeInterval = expirationDate - todaysDate;
        this.timeOutInterval = setTimeout(() => {
            this.store.dispatch(autoLogOut());
        }, timeInterval)
    }
    getUserFromLocalStorage() {
        const userDataString = localStorage.getItem('userData');

        if (userDataString) {
            const data = JSON.parse(userDataString);
            const expirationDate = new Date(data.expirationDate);
            const user=new UserModel(
                data.token, 
                data.loginId, 
                data.customerId,
                 data.userName,
                data.password,
                 data.firstName,
                 data.lastName,
                 data.fullName,
                 data.email,
                 data.phone,
                 data.isSuccess,
                 data.expireDate);
            this.runTimeOutInterval(user);
            return user;
        }
        return null;
    }
    getUserFromLocalStorageFirebase() {
        const userDataString = localStorage.getItem('userData');

        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const expirationDate = new Date(userData.expirationDate);
            const user = new User(userData.email, userData.token, userData.localId, expirationDate,'','','');
            this.runTimeOutIntervalFirebase(user);
            return user;
        }
        return null;
    }
    
    logout() {
        localStorage.removeItem('userData');
        if (this.timeOutInterval) {
            clearTimeout(this.timeOutInterval);
            this.timeOutInterval = null;
        }
    }
}
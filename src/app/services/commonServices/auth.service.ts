import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponseData } from "../../models/authModels/AuthResponseData";
import { Observable, of } from "rxjs";
import { IUserModel, User, UserModel } from "../../models/userModels/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { autoLogOut } from "../../auth/state/auth.actions";
import { changePass } from "../../models/authModels/changePass.model";
import { LoginModel } from "src/app/models/authModels/login.model";
import { Modules } from "../../models/moudleNodels/modules.model";
import { currentModulePath } from "src/app/models/commonModels/currentModulePath";
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
    login(email: string, password: string): Observable<LoginModel> {
        return this.http.post<LoginModel>(
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
    signup(model:UserModel): Observable<LoginModel> {
        return this.http.post<LoginModel>(
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
    formatUser(data: LoginModel) {
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
             data.expireDate as Date,
             data.roleName,
             data.profilePicName
             );
        return user;
    }
    formatModules(data: Modules[]) {
        //const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
        const modules:Modules[]=[];
        return modules;
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
    setModuleInLocalStorage(modules: Modules[]|undefined) {
        localStorage.setItem('modules', JSON.stringify(modules));
    }
    setToggleDataInLocalStorage(isToggle: boolean) {
        localStorage.setItem('sb|sidebar-toggle', JSON.stringify(isToggle));
    }
    runTimeOutInterval(user: UserModel) {
        const todaysDate = new Date().getTime();
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
                 data.expireDate,
                 data.roleName,
                 data.profilePicName
                 );
                 
            this.runTimeOutInterval(user);
            return user;
        }
        return null;
    }
    getModulesFromLocalStorage() {
        const modulesDataString = localStorage.getItem('modules');

        const modules:Modules[]=[];

        if (modulesDataString) {
            const data = JSON.parse(modulesDataString);
            data.forEach((item:Modules)=> {
                modules.push(item);
            });
            return modules;
        }
        return modules;
    }
    getCurrentModulePathFromLocalStorage() {
        const modulesDataString = localStorage.getItem('currentModuleAndPath');

        const modules:currentModulePath={
            moduleId: 0,
            modulePath: "",
            menuId: 0,
            menuPath: "",
            canCreate: false,
            canView: false,
            canEdit: false,
            canDelete: false
        };

        if (modulesDataString) {
            const data = JSON.parse(modulesDataString);
            modules.moduleId=data.moduleId;
            modules.modulePath=data.modulePath;
            modules.menuId=data.menuId;
            modules.menuPath=data.menuPath;
            modules.canCreate=data.canCreate;
            modules.canEdit=data.canEdit;
            modules.canView=data.canView;
            modules.canDelete=data.canDelete;
            return modules;
        }
        return modules;
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
        localStorage.removeItem('modules');
        if (this.timeOutInterval) {
            clearTimeout(this.timeOutInterval);
            this.timeOutInterval = null;
        }
    }
}
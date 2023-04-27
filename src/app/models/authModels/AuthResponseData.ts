export interface AuthResponseData{    
        kind: string;
        localId: string;
        email: string;
        displayName: string;
        idToken: string;
        registered: boolean,
        refreshToken: string;
        expiresIn: string;      
        authKey: string;            
        isSuccess:boolean;
        message:string;
}
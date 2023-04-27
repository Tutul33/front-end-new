import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { EffectsModule } from "@ngrx/effects";
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
const routes:Routes=[
    {
        path:'',
        children:[
            {
                path:'',redirectTo:'login',pathMatch:'full'
            },
            {
                path:'login',component:LoginComponent
            },
            {
                path:'signup',component:SignupComponent
            },
            {
                path:'forgotpassword',component:ForgotpasswordComponent
            },
            {
                path:'changepassword',component:ChangepasswordComponent
            }
        ]
    }
];
@NgModule({
    declarations:[
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent
  ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        //StoreModule.forFeature(AUTH_STATE_NAME,AuthReducer),
        EffectsModule.forFeature(),
    ]
})
export class AuthModule{

}
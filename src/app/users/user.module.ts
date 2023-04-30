import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { UserManagementComponent } from "./user-management/user-management.component";
import { EffectsModule } from "@ngrx/effects";
import { UsersEffects } from "./state/users.effects";
import { StoreModule } from "@ngrx/store";
import { USER_STATE_NAME } from "./state/users.selector";
import { userReducer } from "./state/users.reducer";

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { UserDialogComponent } from "./user-management/add-edit-user/userDialogComponent";
import { MatSelectModule } from "@angular/material/select";
const routes:Routes=[
    {
    path:'',
    component:UserManagementComponent,    
    }
];
@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([UsersEffects]),
        StoreModule.forFeature(USER_STATE_NAME,userReducer),

        //
        MatSlideToggleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule
    ],
    declarations:[
        UserManagementComponent,
        UserDialogComponent
    ]
})
export class UserModule{
}
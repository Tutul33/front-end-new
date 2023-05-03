import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenusComponent } from "./menus/menus.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MENU_STATE_NAME } from "./state/module.selector";
import { ModulesComponent } from './modules/modules.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MenuPermissionComponent } from './menu-permission/menu-permission.component';
import { moduleReducer } from "./state/module.reducer";
import { ModuleEffects } from "./state/module.effects";
import { AddEditModuleComponent } from './modules/add-edit-module/add-edit-module.component';
import { AddEditMenuComponent } from './menus/add-edit-menu/add-edit-menu.component';
import { EditMenuPermissionComponent } from './menu-permission/edit-menu-permission/edit-menu-permission.component';

const routes: Routes = [
    {
        path: '',
        component: ModulesComponent
    },
    {
        path: 'menus',
        component: MenusComponent
    }
    ,
    {
        path: 'permissions',
        component: MenuPermissionComponent
    }
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([ModuleEffects]),
        StoreModule.forFeature(MENU_STATE_NAME, moduleReducer),

        //Material
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
    declarations: [
    ModulesComponent,
    MenusComponent,
    MenuPermissionComponent,
    AddEditModuleComponent,
    AddEditMenuComponent,
    EditMenuPermissionComponent
  ]
})
export class ModuleManagementModule {

}
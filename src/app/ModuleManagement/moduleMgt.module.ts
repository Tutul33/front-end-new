import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenusComponent } from "./menus/menus.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MENU_STATE_NAME } from "./state/module.selector";
import { moduleReducer } from "./state/module.reducer";
import { ModulesComponent } from './modules/modules.component';

const routes: Routes = [
    {
        path: '',
        component: ModulesComponent
    },
    {
        path: 'menus',
        component: MenusComponent
    }
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature(),
        StoreModule.forFeature(MENU_STATE_NAME, moduleReducer),
    ],
    declarations: [
    ModulesComponent
  ]
})
export class ModuleManagementModule {

}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { autoLogOut, setCurrentModuleMenuData } from 'src/app/auth/state/auth.actions';
import { getAthourizedModules, getUserInfo } from 'src/app/auth/state/auth.selector';
import { Modules } from "../../../models/moudleNodels/modules.model";
import { UserModel } from 'src/app/models/userModels/user.model';
import { AppState } from 'src/app/store/app.state';
import { Menu } from 'src/app/models/menuModels/menu.model';
import { currentModulePath } from '../../../models/commonModels/currentModulePath';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  
  modules!: Observable<Modules[]>;
  moduleSubscription: Subscription | any;
  userData: UserModel;
  constructor(private store: Store<AppState>) {

  }
  ngOnDestroy(): void {
    this.moduleSubscription.unsubscribe();
    
  }
  moduleList: Modules[] = [];
  profilePicUrl: string = "";
  ngOnInit(): void {    
    this.modules = this.store.select(getAthourizedModules);
    this.moduleSubscription = this.store.select(getAthourizedModules).subscribe((data) => {
      this.moduleList = data;      
    });
  }
  onModuleClick(event: Event, module: Modules, menu: Menu) {
    const currentModulePath: currentModulePath = {
      moduleId: module.moduleId,
      modulePath: module.modulePath as string,
      menuId: menu.menuId,
      menuPath: menu.menuPath,
      canCreate: menu.canCreate == undefined ? false : true,
      canView: menu.canView == undefined ? false : true,
      canEdit: menu.canEdit == undefined ? false : true,
      canDelete: menu.canDelete == undefined ? false : true
    }
    this.store.dispatch(setCurrentModuleMenuData({ currentModulePath }));

  }
  onMenuClick(event: Event, module: Modules, menu: Menu) {
    const currentModulePath: currentModulePath = {
      moduleId: module.moduleId,
      modulePath: module.modulePath as string,
      menuId: menu.menuId,
      menuPath: menu.menuPath,
      canCreate: menu.canCreate == undefined ? false : true,
      canView: menu.canView == undefined ? false : true,
      canEdit: menu.canEdit == undefined ? false : true,
      canDelete: menu.canDelete == undefined ? false : true
    }
    this.store.dispatch(setCurrentModuleMenuData({ currentModulePath }));
  }
  onLogOut(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogOut());
  }
  
}

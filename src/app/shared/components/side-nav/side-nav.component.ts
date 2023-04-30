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
  user!: Observable<UserModel>;
  modules!: Observable<Modules[]>;
  moduleSubscription: Subscription | any;
  userInfoSubscription: Subscription | any;
  userData: UserModel;
  constructor(private store: Store<AppState>) {

  }
  ngOnDestroy(): void {
    this.moduleSubscription.unsubscribe();
    this.userInfoSubscription.unsubscribe();
  }
  moduleList: Modules[] = [];
  profilePicUrl: string = "";
  ngOnInit(): void {
    this.user = this.store.select(getUserInfo);
    this.userInfoSubscription = this.store.select(getUserInfo).subscribe((data) => {
      if (data.profilePicName != '') {
        this.profilePicUrl = this.getProfilePicture(data.profilePicName);
        var propic = (<HTMLImageElement>document.getElementById("profilePicID"));
        if (propic)
          propic.src = this.profilePicUrl;
      }
    })
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
      canCreate: menu.canCreate,
      canView: menu.canView,
      canEdit: menu.canEdit,
      canDelete: menu.canDelete
    }
    this.store.dispatch(setCurrentModuleMenuData({ currentModulePath }));

  }
  onMenuClick(event: Event, module: Modules, menu: Menu) {
    const currentModulePath: currentModulePath = {
      moduleId: module.moduleId,
      modulePath: module.modulePath as string,
      menuId: menu.menuId,
      menuPath: menu.menuPath,
      canCreate: menu.canCreate,
      canView: menu.canView,
      canEdit: menu.canEdit,
      canDelete: menu.canDelete
    }
    this.store.dispatch(setCurrentModuleMenuData({ currentModulePath }));
  }
  onLogOut(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogOut());
  }
  getProfilePicture(fileName?: string) {
    if (fileName != undefined) {
      return environment.API_URL + "/api/customer/ProfilePic/" + fileName;
    }
    return '';
  }
}

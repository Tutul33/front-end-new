import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { autoLogOut } from 'src/app/auth/state/auth.actions';
import { getAthourizedModules, getUserInfo } from 'src/app/auth/state/auth.selector';
import { Modules } from "../../../models/moudleNodels/modules.model";
import { IUserModel, UserModel } from 'src/app/models/userModels/user.model';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit,OnDestroy {
  menu: any[] = [
    {
      menuId: 1,
      menuName: 'Dashboard',
      menuPath: '/',
      menuIcon:'fas fa-tachometer-alt',
      hasChild:false,
      childMenu: [

      ]
    },
    {
      menuId: 2,
      menuName: 'User',
      menuPath: 'users',
      menuIcon:'fa fa-user',
      hasChild:false,
      childMenu: [

      ]
    },
    {
      menuId: 3,
      menuName: 'Modules',
      menuPath: 'modules',
      menuIcon:'fas fa-columns',
      hasChild:true,
      childMenu: [
        {
          menuId: 1,
          menuName: 'Menu',
          menuPath: 'modules/menus',
          menuIcon:'fa fa-bars',
        }
      ]
    }
  ];
  user!: Observable<UserModel>;
  modules!:Observable<Modules[]>;
  moduleSubscription: Subscription|any;
  constructor(private store: Store<AppState>) {

  }
  ngOnDestroy(): void {
    this.moduleSubscription.unsubscribe();
  }
  moduleList:Modules[]=[];
  ngOnInit(): void {
    this.user = this.store.select(getUserInfo);
    this.modules = this.store.select(getAthourizedModules);
    this.moduleSubscription=this.store.select(getAthourizedModules).subscribe((data)=>{
      console.log(data);
      this.moduleList=data;
    });
  }


  onLogOut(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogOut());
  }

}

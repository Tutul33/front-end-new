import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { autoLogOut } from 'src/app/auth/state/auth.actions';
import { getUserInfo } from 'src/app/auth/state/auth.selector';
import { IUserModel, UserModel } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  user!: Observable<UserModel>;
  constructor(private store: Store<AppState>) {

  }
  ngOnInit(): void {
    this.user=this.store.select(getUserInfo);
  }


  onLogOut(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogOut());
  }

}

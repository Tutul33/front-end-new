import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getToggle, getUserInfo, isAuthenticated } from 'src/app/auth/state/auth.selector';
import { autoLogOut, setToggle } from 'src/app/auth/state/auth.actions';
import { UserModel } from 'src/app/models/userModels/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  IsAuthenticated?: Observable<boolean>;
  isToggled?: boolean = false;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.IsAuthenticated = this.store.select(isAuthenticated);

    this.store.select(getToggle).subscribe((data) => {
      this.isToggled = data;
    });

  }
  onLogOut(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogOut());
  }
  toggleSideNav() {
    this.store.dispatch(setToggle({ isToggle: !this.isToggled }));
  }
}

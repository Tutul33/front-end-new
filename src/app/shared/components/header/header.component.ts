import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getToggle, getUserInfo, isAuthenticated } from 'src/app/auth/state/auth.selector';
import { autoLogOut, setToggle } from 'src/app/auth/state/auth.actions';
import { UserModel } from 'src/app/models/userModels/user.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  IsAuthenticated?: Observable<boolean>;
  user!: Observable<UserModel>;
  isToggled?: boolean = false;
  userInfoSubscription!:Subscription;
  profilePicUrl:string='';
  constructor(private store: Store<AppState>) {}
  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.user = this.store.select(getUserInfo);
    this.IsAuthenticated = this.store.select(isAuthenticated);

    this.store.select(getToggle).subscribe((data) => {
      this.isToggled = data;
    });
    this.loadPP();
  }
  getProfilePicture(fileName?: string) {
    if (fileName != undefined) {
      return environment.API_URL + "/api/customer/ProfilePic/" + fileName;
    }
    return '';
  }
  loadPP(){
    this.userInfoSubscription = this.store.select(getUserInfo).subscribe((data) => {
      var propic = (<HTMLImageElement>document.getElementById("profilePicID"));
      if (data.profilePicName != '') {
        this.profilePicUrl = this.getProfilePicture(data.profilePicName);       
        if (this.profilePicUrl!='') {         
          if (propic)
            propic.src = this.profilePicUrl;
        } else {
          if (propic)
          propic.src = "../../../../assets/img/avatars/avatar.jpg";
        }       
      }
      else {
        if (propic)
        propic.src = "../../../../assets/img/avatars/avatar.jpg";
      }  
    })
  }

  onLogOut(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogOut());
  }
  toggleSideNav() {
    this.store.dispatch(setToggle({ isToggle: !this.isToggled }));
  }
}

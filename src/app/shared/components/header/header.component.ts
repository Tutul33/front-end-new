import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getToggle, getUserInfo, isAuthenticated } from 'src/app/auth/state/auth.selector';
import { autoLogOut, setToggle } from 'src/app/auth/state/auth.actions';
import { UserModel } from 'src/app/models/userModels/user.model';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/commonServices/auth.service';
import { CommonService } from 'src/app/services/commonServices/common.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  IsAuthenticated?: Observable<boolean>;
  user!: Observable<UserModel>;
  isToggled?: boolean = false;
  userInfoSubscription!: Subscription;
  profilePicUrl: string = '';
  constructor(private store: Store<AppState>, private authSvc: AuthService, private cmnSvc: CommonService) { }
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
  getProfilePicByte(fileName: string,imgTag:any) {
    if (fileName != '' || fileName != undefined) {
      this.authSvc.getProfilePicture(fileName).subscribe((data: any) => {
        if (data!=undefined || data!=null) 
        {             
        this.cmnSvc.blobToBase64Image(data, imgTag);
        } else {
          imgTag.src = "../../../../assets/img/avatars/avatar.jpg";
        }
      })
    }
  }
  loadPP() {
    this.userInfoSubscription = this.store.select(getUserInfo).subscribe((data) => {
      var imgTag = (<HTMLImageElement>document.getElementById("profilePicID"));
      if (data!=null) {
        if(data.profilePicName!='')
        this.getProfilePicByte(data.profilePicName,imgTag);
        else{
           this.showProfilePic(imgTag);
        }
      }
      else {
        this.showProfilePic(imgTag);
      }
    })
  }
  showProfilePic(imgTag:any){
    if (imgTag)
        imgTag.src = "assets/img/avatars/avatar.jpg";
  }
  onLogOut(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogOut());
  }
  toggleSideNav() {
    this.store.dispatch(setToggle({ isToggle: !this.isToggled }));
  }
}

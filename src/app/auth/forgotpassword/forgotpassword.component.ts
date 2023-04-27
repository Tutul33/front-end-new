import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setForgotPassword } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.action';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{
  email:string='';
  constructor(private store:Store<AppState>){}
  ngOnInit(): void {    
  }
  sendEmail(){
    if (this.email) {
      this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(setForgotPassword({ email: this.email }));      
    }    
  }
}

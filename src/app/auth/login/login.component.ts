import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth.actions';
import { Login } from 'src/app/models/authModels/login.model';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup | any;
  constructor(private store: Store<AppState>) {

  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
      isRememberMe: new FormControl(false)
    });
  }
  onSubmit() {
    if(!this.loginForm.valid){
      return;
    }
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(loginStart({email:this.loginForm.value.email,password:this.loginForm.value.password  }));
  }
  showEmailValidtionError(){
    const emailForm=this.loginForm.get('email');
    if (emailForm.touched && !emailForm.valid) {
      if (emailForm.errors.required)
       {
        return 'Email is required.';
      }
      if (emailForm.errors.email)
       {
        return 'Invalid Email.';
      }
      
    }
    return '';
  }
  showPasswordValidtionError(){
    const passordForm=this.loginForm.get('password');
    if (passordForm.touched && !passordForm.valid) {
      if (passordForm.errors.required)
       {
        return 'Password is required.';
      }
     
    }
    return '';
  }
}

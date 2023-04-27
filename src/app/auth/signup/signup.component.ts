import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signupStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.action';
import { UserModel } from 'src/app/models/userModels/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signUpFrom?:FormGroup|any;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.signUpFrom=new FormGroup({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      phone:new FormControl(''),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    })
  }
  onSignUpSubmit(){
    if (!this.signUpFrom.valid) {
      return;
    }
    const user=new UserModel(
      '', 
      0, 
      0,
       '',
       this.signUpFrom.value.password,
       this.signUpFrom.value.firstName,
       this.signUpFrom.value.lastName,
       '',
       this.signUpFrom.value.email,
       this.signUpFrom.value.phone,
       false,
       new Date());
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(signupStart({user:user }));
  }
  showEmailValidtionError(){
    const emailForm=this.signUpFrom.get('email');
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
    const passordForm=this.signUpFrom.get('password');
    if (passordForm.touched && !passordForm.valid) {
      if (passordForm.errors.required)
       {
        return 'Password is required.';
      }
     
    }
    return '';
  }
 
}

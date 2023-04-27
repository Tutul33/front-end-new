import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.state';
import { dycryptKeyToChangePassword, setChangePassword } from '../state/auth.actions';
import { Subscription } from 'rxjs';
import { getUserPassChangeInfo } from '../state/auth.selector';
import { ActivatedRoute } from '@angular/router';
import { changePass } from 'src/app/models/changePass.model';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.action';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit, OnDestroy {
  changePassform: FormGroup | any;
  customerId: number=0;
  changePassKey: string = "";
  response: any;
  postSubscription?: Subscription;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.createForm();
    this.route.queryParams.subscribe(params => {
      this.response = params;
      this.changePassKey = this.response.key;
    }
    );
    this.store.dispatch(dycryptKeyToChangePassword({ key: this.changePassKey }));
    this.postSubscription = this.store.select(getUserPassChangeInfo).subscribe((user: any) => {
      if (user) {
        this.customerId = user.CustomerID;
      }
    })
  }
  createForm() {
    this.changePassform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      CustomerId: new FormControl(0)
    });
  }
  onSubmit() {
    if (!this.changePassform.valid) {
      return;
    }
    const userPassModel = new changePass(this.customerId, this.changePassform.value.password);
    this.store.dispatch(setLoadingSpinner({ status: true }))
    this.store.dispatch(setChangePassword({ model: userPassModel }));
  }
  showPasswordValidtionError() {
    const passwordForm = this.changePassform.get('password');
    if (passwordForm.touched && !passwordForm.valid) {
      if (passwordForm.errors.required) {
        return 'Password is required.';
      }
      if (passwordForm.errors.minLength) {
        return 'Minimum length of password is 6.';
      }
    }
    return '';
  }
  showConfirmPasswordValidtionError() {
    const passwordConfirmForm = this.changePassform.get('confirmPassword');
    const passwordForm = this.changePassform.get('password');
    if (passwordConfirmForm.touched && !passwordConfirmForm.valid) {
      if (passwordConfirmForm.errors.required) {
        return 'Confirm password is required.';
      }
      if (passwordConfirmForm.errors.minLength) {
        return 'Minimum length of password is 6.';
      }
      if (passwordConfirmForm.value != passwordForm.value) {
        return 'Password and confirm password must me same.';
      }
    }
    return '';
  }
  checkPasswordValidity() {
    if (this.changePassform.valid) {
      const passwordConfirmForm = this.changePassform.get('confirmPassword');
      const passwordForm = this.changePassform.get('password');
      if (passwordConfirmForm.value != passwordForm.value) {
        return 'Password and confirm password must me same.';
      }
    }
    return '';
  }
}

import { Component,ElementRef,Inject, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { IUserModel } from "src/app/models/userModels/user.model";
import { AppState } from "src/app/store/app.state";
import { addUser, updateUser } from "../../state/users.action";
import { Observable } from "rxjs";
import { Role } from "src/app/models/commonModels/role.model";
import { getRoles } from "../../state/users.selector";
import { CommonService } from "../../../services/commonServices/common.service";
@Component({
    selector: 'user-dialog',
    templateUrl: 'userDialog.html',
    styleUrls: ['../user-management.component.css']
  })
  export class UserDialogComponent implements OnInit {
    userFrom?:FormGroup|any;roleList!:Observable<Role[]>;
    title:string="";
    list: IUserModel[] = [];
    @ViewChild('fileInput') fileInput: ElementRef | any;
    fileAttr = 'File';
    constructor(
      public dialogRef: MatDialogRef<UserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IUserModel,
      private store:Store<AppState>,
      private _cmnService:CommonService
    ) {}
    ngOnInit(): void {
        this.createForm();
      if (this.data.customerId) {
        this.title='Edit';
      }else{
        this.title='Add';
      }     
      this.loadRole(); 
    }
    loadRole(){
      this.roleList=this.store.select(getRoles);
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    createForm(){
      if (this.data.customerId as number>0) {
        this.userFrom=new FormGroup({
          firstName:new FormControl(this.data.firstName,Validators.required),
          lastName:new FormControl(this.data.lastName,Validators.required),
          phone:new FormControl(this.data.phone),
          email:new FormControl(this.data.email,[Validators.required,Validators.email]),
          password:new FormControl(this.data.password,[Validators.required]),
          roleId:new FormControl(this.data.roleId,[Validators.required])
        });
      }else{
        
        this.userFrom=new FormGroup({
          firstName:new FormControl(null,Validators.required),
          lastName:new FormControl(null,Validators.required),
          phone:new FormControl(''),
          email:new FormControl('',[Validators.required,Validators.email]),
          password:new FormControl('',[Validators.required]),
          roleId:new FormControl(0,[Validators.required])
        });
      }
      }
      onSignUpSubmit(){
        if (!this.userFrom?.valid) {
          return;
        }
        const user:IUserModel={
          customerId:this.data.customerId as number,
          password: this.userFrom.value.password,
          firstName: this.userFrom.value.firstName,
          lastName: this.userFrom.value.lastName,
          email: this.userFrom.value.email,
          phone: this.userFrom.value.phone,
          roleId:this.userFrom.value.roleId
        }
       
        if (this.data.customerId as number>0) {
          this.store.dispatch(updateUser({user,uploadedFile:this.files }));
        } else {
          this.store.dispatch(addUser({user,uploadedFile:this.files }));
        }
      }
      showRolesValidtionError(){
        const roleForm=this.userFrom.get('roleId');
        if (roleForm.touched && !roleForm.valid) {
          if (roleForm.errors.required)
           {
            return 'Role is required.';
          }
          if (roleForm.errors.roleId)
           {
            return 'Invalid Role.';
          }
          
        }
        return '';
      }
      showEmailValidtionError(){
        const emailForm=this.userFrom.get('email');
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
        const passordForm=this.userFrom.get('password');
        if (passordForm.touched && !passordForm.valid) {
          if (passordForm.errors.required)
           {
            return 'Password is required.';
          }
         
        }
        return '';
      }
      showFirstNameValidtionError(){
        const firstNameForm=this.userFrom.get('firstName');
        if (firstNameForm.touched && !firstNameForm.valid) {
          if (firstNameForm.errors.required)
           {
            return 'First Name is required.';
          }     
        }
        return '';
      }
      showLastNameValidtionError(){
        const lastNameForm=this.userFrom.get('lastName');
        if (lastNameForm.touched && !lastNameForm.valid) {
          if (lastNameForm.errors.required)
           {
            return 'Last Name is required.';
          }     
        }
        return '';
      }
 
  files:any=[];
  uploadFileEvt(uploadedfiles: any) {
    this.files=this._cmnService.fileUpload(uploadedfiles);
  }
  }
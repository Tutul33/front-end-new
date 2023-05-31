import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Role } from 'src/app/models/commonModels/role.model';
import { CommonService } from 'src/app/services/commonServices/common.service';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.action';
import { AppState } from 'src/app/store/app.state';
import { addRole, updateRole } from '../state/roles.actions';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  title:string="";
  roleForm:FormGroup |any;
  roleList:Role[]=[];
  constructor(public dialogRef: MatDialogRef<AddRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Role,
    private store:Store<AppState>,
    private _cmnService:CommonService){

  }
  ngOnInit(): void {
   this.createMenu();
   if(this.data)
   {
   if (this.data.roleId>0) {
    this.roleForm.patchValue({
      roleId: this.data.roleId,
      roleName:this.data.roleName,
      sequence:this.data.sequence      
    });
   }
   }
  }
  createMenu(){
    this.roleForm=new FormGroup({
      roleId: new FormControl(0),
      roleName: new FormControl(null,Validators.required),
      sequence: new FormControl(0),
    });
  }
  onNoClick(){
    this.dialogRef.close();
  }
  onRoleSubmit(){
   if (!this.roleForm.valid) {
    return;
   }
   const role:Role={
    roleId: this.roleForm.value.roleId,
    roleName: this.roleForm.value.roleName,
    sequence: this.roleForm.value.sequence,
   }
   this.store.dispatch(setLoadingSpinner({status:true}));
   if (this.data) {
    if (this.data.roleId>0)
    this.store.dispatch(updateRole({role}));
   } else {
    this.store.dispatch(addRole({role}));
   }
  }
  showRoleNameValidtionError(){
    const modulePathForm=this.roleForm.get('roleName');
        if (modulePathForm.touched && !modulePathForm.valid) {
          if (modulePathForm.errors.required)
           {
            return 'Name is required.';
          }                    
        }
        return '';
  }  
}

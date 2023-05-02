import { group } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Modules } from 'src/app/models/moudleNodels/modules.model';
import { CommonService } from 'src/app/services/commonServices/common.service';
import { AppState } from 'src/app/store/app.state';
import { addModule } from '../../state/module.actions';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.action';

@Component({
  selector: 'app-add-edit-module',
  templateUrl: './add-edit-module.component.html',
  styleUrls: ['./add-edit-module.component.css']
})
export class AddEditModuleComponent implements OnInit {
  title:string='';
  moduleForm:FormGroup|any;
  constructor(public dialogRef: MatDialogRef<AddEditModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modules,
    private store:Store<AppState>,
    private _cmnService:CommonService){
     if (data.moduleId>0) {
      this.title="Edit";
     }else{
      this.title="Add";
     }
  }
  ngOnInit(): void {
  this.createForm();
  }
  createForm(){
    if (this.data.moduleId>0) {
      this.moduleForm=new FormGroup({
        moduleId:new FormControl(this.data.moduleId),
        moduleName:new FormControl(this.data.moduleName,Validators.required),
        moduleColor:new FormControl(this.data.moduleColor),
        moduleIcon:new FormControl(this.data.moduleIcon,Validators.required),
        modulePath:new FormControl(this.data.modulePath,Validators.required),
        description:new FormControl(this.data.description),
        moduleSequence:new FormControl(this.data.moduleSequence,Validators.required)
      });
    }else{
      this.moduleForm=new FormGroup({
        moduleName:new FormControl(null,Validators.required),
        moduleColor:new FormControl(null),
        moduleIcon:new FormControl(null,Validators.required),
        modulePath:new FormControl(null,Validators.required),
        description:new FormControl(null),
        moduleSequence:new FormControl(null,Validators.required)
      });
    }
    
  }
  showModuleNameValidtionError(){
    const moduleNameForm=this.moduleForm.get('moduleName');
        if (moduleNameForm.touched && !moduleNameForm.valid) {
          if (moduleNameForm.errors.required)
           {
            return 'Name is required.';
          }                    
        }
        return '';
  }
  showModulePathValidtionError(){
    const modulePathForm=this.moduleForm.get('modulePath');
        if (modulePathForm.touched && !modulePathForm.valid) {
          if (modulePathForm.errors.required)
           {
            return 'Path is required.';
          }                    
        }
        return '';
  }
  showModuleIconValidtionError(){
    const modulePathForm=this.moduleForm.get('moduleIcon');
        if (modulePathForm.touched && !modulePathForm.valid) {
          if (modulePathForm.errors.required)
           {
            return 'Icon is required.';
          }                    
        }
        return '';
  }
  showModuleSequenceValidtionError(){
    const modulePathForm=this.moduleForm.get('moduleSequence');
        if (modulePathForm.touched && !modulePathForm.valid) {
          if (modulePathForm.errors.required)
           {
            return 'Sequence is required.';
          }                    
        }
        return '';
  }
  onNoClick(){
    this.dialogRef.close();
  }
  onModuleSubmit(){
    const module:Modules={
      moduleId: this.moduleForm.value.moduleId,
      moduleName: this.moduleForm.value.moduleName,
      description: this.moduleForm.value.description,
      moduleIcon: this.moduleForm.value.moduleIcon,
      moduleColor: this.moduleForm.value.moduleColor,
      modulePath: this.moduleForm.value.modulePath,
      moduleSequence: this.moduleForm.value.moduleSequence
    }
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(addModule({module}));
  }
}

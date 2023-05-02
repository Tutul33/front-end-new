import { Component, OnInit ,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Menu } from 'src/app/models/menuModels/menu.model';
import { CommonService } from 'src/app/services/commonServices/common.service';
import { AppState } from 'src/app/store/app.state';
import { addMenu, loadModule, updateMenu } from '../../state/module.actions';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.action';
import { Observable } from 'rxjs';
import { Modules } from 'src/app/models/moudleNodels/modules.model';
import { getModulesAll } from '../../state/module.selector';

@Component({
  selector: 'app-add-edit-menu',
  templateUrl: './add-edit-menu.component.html',
  styleUrls: ['./add-edit-menu.component.css']
})
export class AddEditMenuComponent implements OnInit {
  title:string="";
  menuForm:FormGroup |any;
  moduleList:Modules[];
  constructor(public dialogRef: MatDialogRef<AddEditMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu,
    private store:Store<AppState>,
    private _cmnService:CommonService){

  }
  ngOnInit(): void {
   this.createMenu();
   if (this.data.menuId>0) {
    this.menuForm.patchValue({
      menuId: this.data.menuId,
      menuName: this.data.menuName,
      moduleId: this.data.moduleId,
      menuColor: this.data.menuColor,
      parentId: this.data.parentId,
      isSubParent: this.data.isSubParent,
      subParentId: this.data.subParentId,
      menuIcon: this.data.menuIcon,
      menuPath: this.data.menuPath,
      description: this.data.description,
      menuSequence: this.data.menuSequence
    });
   } 
   this.store.select(getModulesAll).subscribe((data)=>{
        this.moduleList=data.modules;
   });
  }
  createMenu(){
    this.menuForm=new FormGroup({
      menuId: new FormControl(0),
      menuName: new FormControl(null,Validators.required),
      moduleId: new FormControl(null,Validators.required),
      menuColor: new FormControl(null),
      parentId: new FormControl(null),
      isSubParent: new FormControl(false),
      subParentId: new FormControl(0),
      menuIcon: new FormControl(null,Validators.required),
      menuPath: new FormControl(null,Validators.required),
      description: new FormControl(null),
      menuSequence: new FormControl(0),
    });
  }
  onNoClick(){
    this.dialogRef.close();
  }
  onMenuSubmit(){
   if (!this.menuForm.valid) {
    return;
   }
   const menu:Menu={
    menuId: this.menuForm.value.menuId,
    menuName: this.menuForm.value.menuName,
    moduleId: this.menuForm.value.moduleId,
    menuColor: this.menuForm.value.menuColor,
    parentId: this.menuForm.value.parentId,
    isSubParent: this.menuForm.value.isSubParent,
    subParentId: this.menuForm.value.subParentId,
    menuIcon: this.menuForm.value.menuIcon,
    menuPath: this.menuForm.value.menuPath,
    description: this.menuForm.value.description,
    menuSequence: this.menuForm.value.menuSequence
   }
   this.store.dispatch(setLoadingSpinner({status:true}));
   if (this.data.menuId>0) {
    this.store.dispatch(updateMenu({menu}));
   } else {
    this.store.dispatch(addMenu({menu}));
   }
  }
  showMenuNameValidtionError(){
    const modulePathForm=this.menuForm.get('menuName');
        if (modulePathForm.touched && !modulePathForm.valid) {
          if (modulePathForm.errors.required)
           {
            return 'Name is required.';
          }                    
        }
        return '';
  }
  showModuleValidtionError(){
    const modulePathForm=this.menuForm.get('moduleId');
    if (modulePathForm.touched && !modulePathForm.valid) {
      if (modulePathForm.errors.required)
       {
        return 'Module is required.';
      }                    
    }
    return '';
  }
}

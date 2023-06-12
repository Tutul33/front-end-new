import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TibOperationComponent } from './tib-operation/tib-operation.component';
import { Routes } from '@angular/router';

const route:Routes=[
  {
    path:"",
    component:TibOperationComponent
  }
];

@NgModule({
  declarations: [
    TibOperationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TibModule { }

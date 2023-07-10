import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChattingComponent } from './chatting/chatting.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
      path: '',
      component: ChattingComponent
  }
]

@NgModule({
  declarations: [
    ChattingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ChatModule { }

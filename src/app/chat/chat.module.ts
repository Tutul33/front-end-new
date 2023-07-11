import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChattingComponent } from './chatting/chatting.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatEffects } from './state/chat.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CHAT_STATE_NAME } from './state/chat.selector';
import { chatReducer } from './state/chat.reducer';

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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([ChatEffects]),
    StoreModule.forFeature(CHAT_STATE_NAME, chatReducer),
  ]
})
export class ChatModule { }

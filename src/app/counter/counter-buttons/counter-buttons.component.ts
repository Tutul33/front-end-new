import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.action';
import { CounterState } from '../state/counterState';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent {
  // for local state only
  //constructor(private store:Store<{counter: CounterState}>){}

   // for global state only
   constructor(private store:Store<AppState>){}

  OnIncrement(){
    this.store.dispatch(increment());
  }

  OnDecrement(){
   this.store.dispatch(decrement());
  }

  OnReset(){
   this.store.dispatch(reset());
  }
}

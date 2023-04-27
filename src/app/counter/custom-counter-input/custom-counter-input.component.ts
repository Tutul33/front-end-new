import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counterState';
import { changeDesignation, customIncrement } from '../state/counter.action';
import { getDesignation } from '../state/counter.selector';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit{
  value:number=0;
  //designation:string='';
  designation$?:Observable<string>;

  //for local or counter state only
  // constructor(private store:Store<{counter:CounterState}>){

  // }

  //For global state
  constructor(private store:Store<AppState>){

  }
  ngOnInit(): void {
    //without selector and subscribe
    // this.store.select('counter').subscribe((data)=>{
    //   this.designation = data.designation;
    // });

    //with selector and subscribe
    // this.store.select(getDesignation).subscribe((designation)=>{      
    // console.log('Call designation only.')
    //   this.designation = designation;
    // });

    //with observable and subscribe
    this.designation$=this.store.select(getDesignation);

  }
  addToCounter(){
    this.store.dispatch(customIncrement({count:+this.value}));
  }
  changesDesignation(){
    this.store.dispatch(changeDesignation({designation:''}))
  }
}

import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { loadRoles } from '../auth/state/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private store:Store<AppState>){

  }
  ngOnInit(): void {
    this.loadRole();
  }
  loadRole(){
    this.store.dispatch(loadRoles());    
  }  
}

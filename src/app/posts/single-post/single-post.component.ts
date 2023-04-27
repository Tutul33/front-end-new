import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/postModels/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/post.selector';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{
//post:Observable<Post> | undefined;
post?:Post;
constructor(private store:Store<AppState>){

}
ngOnInit(): void {
  //this.post=this.store.select(getPostById);
  this.store.select(getPostById).subscribe((post:any)=>{
    this.post=post;
  });
}
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/postModels/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from '../state/post.selector';
import { deletePost, loadPosts } from '../state/post.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts$?:Observable<Post[]>;
  constructor(private store:Store<AppState>){

  }
  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    
    this.store.dispatch(loadPosts());
  }
  onDeletePost(id:any){
    if(confirm('Are you sure to delete?'))
         this.store.dispatch(deletePost({id}));

  }
}

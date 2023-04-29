import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/post.actions';
//import { addPosts } from '../state/post.selector';
import { Post } from 'src/app/models/postModels/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{  
postForm:FormGroup|any;
constructor(private store:Store<AppState>){

}
ngOnInit(): void {
  this.postForm=new FormGroup({
    title:new FormControl(null,[
      Validators.required,
      Validators.minLength(6)
    ]),
    description:new FormControl(null,[
      Validators.required,
      Validators.minLength(10)
    ]),
  });
}
showDescriptionErrors(){
  const descriptionForm=this.postForm.get('description');
  if (descriptionForm.touched && !descriptionForm.valid) {
    if (descriptionForm.errors.required)
     {
      return 'Description is required.';
    }
    if (descriptionForm.errors.minlength)
     {
      return 'Description should be minimum 10 characters length.';
    }
  }
  return '';
}
OnAddPost(){
  if (!this.postForm.valid) {
   return;
  }
  // console.log(this.postForm.value);
   //this.store.dispatch(addPost,this.postForm.value); 
   const post:Post={    
     id:'', 
     title:this.postForm.controls.title.value,
     description:this.postForm.controls.description.value,
   };
this.store.dispatch(addPost({post})); 
}
}

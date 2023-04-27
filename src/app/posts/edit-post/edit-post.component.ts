import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/post.selector';
import { Post } from 'src/app/models/post.model';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/post.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post?: Post | any;
  postForm: FormGroup | any;
  id: string | any;
  postSubscription?: Subscription;
  constructor(
    private store: Store<AppState>,
    //private route: ActivatedRoute
    ) {

  }
  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
  }
  ngOnInit(): void {

    // this.route.paramMap.subscribe((params)=>{
    //   const id=params.get('id');
    //   this.id=id?.toString();

    //   //deprecated
    //   // this.postSubscription=this.store.select(getPostById,{id}).subscribe((data)=>{
    //   //         this.post=data;
    //   //         this.setForm();
    //   // });
    //   //new method with props
    //   this.postSubscription=this.store.select(getPostById({id})).subscribe((data)=>{
    //           this.post=data;
    //           this.setForm();
    //   });
    // });
    this.setForm();
    this.postSubscription = this.store.select(getPostById).subscribe((post: any) => {
      if (post) {
        this.post = post;
        this.id=post.id;
        this.postForm.patchValue({
          title: post.title,
          description: post.description
        });
      }
    })


  }
  setForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm.touched && !descriptionForm.valid) {
      if (descriptionForm.errors.required) {
        return 'Description is required.';
      }
      if (descriptionForm.errors.minlength) {
        return 'Description should be minimum 10 characters length.';
      }
    }
    return '';
  }
  OnUpdatePost() {
    if (!this.postForm.valid) {
      return;
    }
    const post: Post = {
      id: this.id,
      title: this.postForm.controls.title.value,
      description: this.postForm.controls.description.value
    }
    this.store.dispatch(updatePost({ post }));
  }
}

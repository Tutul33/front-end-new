import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { postReducer } from "./state/post.reducer";
import { POST_STATE_NAME } from "./state/post.selector";
import { EffectsModule } from "@ngrx/effects";
import { PostsEffects } from "./state/post.effects";
import { SinglePostComponent } from './single-post/single-post.component';
const routes: Routes = [
  {
    path: '', component: PostsListComponent,
    children: [
      {
        path: 'add', component: AddPostComponent
      },
      {
        path: 'edit/:id', component: EditPostComponent
      }
    ]
  }
];
@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent,
    SinglePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postReducer),
    EffectsModule.forFeature([PostsEffects])
  ]
})
export class PostModule {
}
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/postModels/post.model";

export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const UPDATE_POST_SUCCESS = '[posts page] update post success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';
export const LOAD_POSTS = '[posts page] LOAD posts';
export const LOAD_POSTS_SUCCESS = '[posts page] load post success';

export const addPost=createAction(ADD_POST_ACTION,props<{post:Post}>());
export const addPostSuccess=createAction(ADD_POST_SUCCESS,props<{post:Post}>());
export const updatePost=createAction(UPDATE_POST_ACTION,props<{post:Post}>())
export const updatePostSuccess=createAction(UPDATE_POST_SUCCESS,props<{post:Update<Post>}>())
export const deletePost=createAction(DELETE_POST_ACTION,props<{id:string}>())
export const deletePostSucess=createAction(DELETE_POST_SUCCESS,props<{id:string}>())
export const loadPosts=createAction(LOAD_POSTS);
export const loadPostsSuccess=createAction(LOAD_POSTS_SUCCESS,props<{posts:Post[]}>());
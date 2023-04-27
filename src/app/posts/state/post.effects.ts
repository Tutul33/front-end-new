import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { PostService } from "src/app/services/post.service";
import { AppState } from "src/app/store/app.state";
import { addPost, addPostSuccess, deletePost, deletePostSucess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./post.actions";
import { filter, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { Update } from "@ngrx/entity";
import { Post } from "src/app/models/post.model";
@Injectable()
export class PostsEffects {
    constructor(
        private action$: Actions,
        private postService: PostService,
        private store: Store<AppState>,
        private route: Router) {

    }
    loadPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                return this.postService.getPosts().pipe(map((posts) => {
                    return loadPostsSuccess({ posts })
                }));
            })
        );
    });
    addPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postService.addPost(action.post).pipe(map((data) => {
                    const post = { ...action.post, id: data.name }
                    return addPostSuccess({ post });
                }))
            })
        );
    });
    updatePost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(updatePost),
            switchMap((action) => {
                return this.postService.updatePost(action.post).pipe(map((data) => {
                    const updatedPost:Update<Post>={
                        id:action.post.id,
                        changes:{
                            ...action.post
                        }
                    }
                    return updatePostSuccess({ post: updatedPost });
                }))
            })
        );
    });
    deletePost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postService.deletePost(action.id).pipe(map((data) => {
                    return deletePostSucess({ id: action.id });
                }))
            })
        );
    });
    updateSuccessRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(updatePostSuccess),
                tap((action) => {
                    this.route.navigate(['posts']);
                })
            )
        }, {
        dispatch: false
    }
    );
    getSinglePost = createEffect(() => {
        return this.action$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                return r.payload.routerState.url.startsWith('/posts/details');
            }),
            map((r: RouterNavigatedAction) => {
                let routeNav:any;
                routeNav=r;
                debugger;
                return routeNav.payload.routerState.params.id;
            }),
            switchMap((id)=>{
                debugger
                return this.postService.getPostById(id).pipe(map((post)=>{
                    const postData=[{...post,id}];
                    return loadPostsSuccess({posts:postData});
                }));
            })
        );
    });
}
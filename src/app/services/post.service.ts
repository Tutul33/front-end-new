import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Post } from "../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient) { }
    getPosts(): Observable<Post[]> {
        return this.http
            .get(`https://nexkraft-19e75-default-rtdb.firebaseio.com/posts.json`)
            .pipe(
                map((data: any) => {
                    const posts: Post[] = [];
                    for (let key in data) {
                        posts.push({ ...data[key], id: key });
                    }
                    return posts;
                }
                )
            );
    }
    addPost(post: Post): Observable<{ name: string }> {
        //return this.http.post<{ name: string }>(`https://vue-completecourse.firebaseio.com/posts.json`, post);
        return this.http.post<{ name: string }>(`https://nexkraft-19e75-default-rtdb.firebaseio.com/posts.json`, post);
    }
    updatePost(post: Post) {
        const postData = {
            [post.id]: { title: post.title, description: post.description }
        }
        return this.http
            .patch<{ name: string }>(`https://nexkraft-19e75-default-rtdb.firebaseio.com/posts.json`, postData);
    }
    deletePost(id: string) {
        const url=`https://nexkraft-19e75-default-rtdb.firebaseio.com/posts/${id}.json`;
       
        return this.http.delete(url);
    }
    getPostById(id: string):Observable<Post> {
        const url=`https://nexkraft-19e75-default-rtdb.firebaseio.com/posts/${id}.json`;
       
        return this.http.get<Post>(url);
    }
}
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { autoLogOut } from "../../auth/state/auth.actions";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store:Store<AppState>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe( 
            catchError(err => {
            if (err.status === 401) {//If unathourized, then logout.
                this.store.dispatch(autoLogOut());
            }
            const error = err.error.message || err.statusText;
            return throwError(() => error);
            })
        )
    }
}
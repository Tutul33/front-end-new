import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "../app.state";
import { tap } from "rxjs";
//import { setToggle } from "./shared.action";

export class SharedEffects{
    constructor(
        private action$: Actions,
        private authServie: AuthService,
        private store: Store<AppState>,
        private route: Router) {
    }
    
}
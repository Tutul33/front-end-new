import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SHARED_STATE_NAME='shared';

const getSharedSate=createFeatureSelector<SharedState>(SHARED_STATE_NAME);
export const getLoading=createSelector(getSharedSate,(state)=>{
    return state.showLoading;
});
export const getErrorMessage=createSelector(getSharedSate,(state)=>{
    return state.errorMessage;
});

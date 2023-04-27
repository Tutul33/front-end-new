export interface SharedState{
    showLoading:boolean;
    isToggle:boolean;
    errorMessage:string;
}
export const initialState:SharedState={
    showLoading: false,
    errorMessage: '',
    isToggle: false
}
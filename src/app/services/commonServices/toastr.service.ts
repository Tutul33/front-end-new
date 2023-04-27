import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn:'root'
})
export class MessageService{
   constructor(private _toastr:ToastrService){
   }
   showSuccessMessage(message:string,header?:string){
    header=header?header:'Success!';
    this._toastr.success(message, header, {
        timeOut: 3000,
      });
   }
   showWarningMessage(message:string,header?:string){
    header=header?header:'Warning!';
    this._toastr.warning(message, header, {
        timeOut: 3000,
      });
   }
   showInfoMessage(message:string,header?:string){
    header=header?header:'Info!';
    this._toastr.info(message, header, {
        timeOut: 3000,
      });
   }
   showErrorMessage(message:string,header?:string){
    header=header?header:'Error!';
    this._toastr.error(message, header, {
        timeOut: 3000,
      });
   }
}
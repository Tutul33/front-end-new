import { Injectable } from "@angular/core";
import { MessageService } from "../commonServices/toastr.service";

@Injectable({ providedIn: 'root' })
export class CommonService {
    constructor(private _messageService: MessageService) {

    }
    FormData(postingModel: any, uploadedFile: any) {
        var jsonUserData = JSON.stringify(postingModel);
        var formData = new FormData();
        formData.append('postModel', jsonUserData);
        uploadedFile.forEach((item: any, index: number) => {
            formData.append('attachedFile', uploadedFile[index], uploadedFile[index].name);
        });
        return formData;
    }
    fileTypes: any = ['bmp', 'jpg', 'jpeg', 'png', 'gif', 'webp'
        , 'txt', 'pdf', 'csv'
        , 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'
        , 'mpg', 'mpeg', 'avi', 'wmv', 'mov', 'rm', 'ram', 'swf', 'flv', 'ogg', 'webm', 'mp4', 'm4v', 'm4a', 'mkv', 'ogv', 'oga', 'ogm'
        , 'mid', 'midi', 'wma', 'aac', 'wav', 'mp3', 'ogv'
        , 'zip', 'rar'];
    fileUpload(uploadedfiles: any) {
        var nFile = 0; let files = [];
        for (var i = 0; i < uploadedfiles.target.files.length; i++) {
            let file = uploadedfiles.target.files[i];
            var arryext = file.name.split(".");
            var ext = arryext[arryext.length - 1];
            var extlwr = ext.toLowerCase();
            var fileIndex = this.fileTypes.indexOf(extlwr);
            var fileSizeInMB = file.size / 1024 / 1024; // in MB
            if (fileSizeInMB > 100) {
                this._messageService.showErrorMessage('File size exceeds ' + fileSizeInMB + ' MB', 'File Size Error!');
            } else if (fileIndex === -1) {
                this._messageService.showErrorMessage('File type not supported. Valid file types are ' + this.fileTypes, 'File Type Error!');
            } else {
                files.push(file);
                nFile += 1;
            }
        }
        if (nFile !== uploadedfiles.target.files.length) {
            this._messageService.showErrorMessage('Files not valid.', 'File Format Error!');
        }
        return files;
    }
    blobToBase64Image(blobData: any, htmlTag: any) {
        this.blobToBase64(blobData).then(res => {
            htmlTag.src = res + '';
        });
    }
    blobToBase64(blob: any) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    };
}
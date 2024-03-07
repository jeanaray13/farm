import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private toastr: ToastrService
  ) { }

  showAlert(title:string, message:string, type:string) {
    switch(type){
      case 'SUCCESS':
        this.toastr.success(message, title);
        break;
      case 'ERROR':
        this.toastr.error(message, title);
        break;
      case 'WARNING':
        this.toastr.warning(message, title);
        break;
      case 'INFO':
        this.toastr.info(message, title);
        break;
      default:
        this.toastr.info(message, title);
        break;
    }
  }
}

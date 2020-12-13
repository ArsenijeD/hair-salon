import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  showErrorMessage(status: number, title: string, message: string): void {
    switch(status) {
      case 400: {
        this.toastr.error(message, title);
      }
      default: {
        break;
      }
    }
  }
}

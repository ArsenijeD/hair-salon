import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/core/services/http.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly url = 'authenticate';

  constructor(private httpService: HttpService, private notificationService: NotificationService) { }

  authenticate(username: string, password: string): void {
    this.httpService.post(this.url, {username, password}).subscribe({
      next: (data: any) => { 
        console.log(data.jwt) 
      },
      error: (status: number) => { 
        this.notificationService.showErrorMessage(status, 'Neuspešna prijava', 'Pogrešno korisničko ime ili šifra.')
      }
    });
  }
}

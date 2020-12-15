import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { LoginResponse } from 'src/app/model/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly url = 'authenticate';

  constructor(private httpService: HttpService) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.httpService.post(this.url, { username, password });
  }
}

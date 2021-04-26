import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = 'users';

  //TODO Consider moving this service in appropriate module
  constructor(private httpService: HttpService) { }

  getUserByUsername(username: string): Observable<User> {
    return this.httpService.get(this.url, { username })
  }

  createUser(user: User): Observable<User> {
    return this.httpService.post(this.url, user);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Authority } from 'src/app/model/authority';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = 'users';

  //TODO Consider moving this service in appropriate module
  constructor(private httpService: HttpService) { }

  getUserByUsername(username: string): Observable<User> {
    return this.httpService.get(this.url, { username });
  }

  getUsersByRole(role: Role): Observable<User[]> {
    return this.httpService.get(this.url, { role: Role[role] });
  }

  createUser(user: User): Observable<User> {
    return this.httpService.post(this.url, user);
  }

  hasAuthority(user: User, role: Role): boolean {
    return user.userAuthorities.some((authority: Authority) => {
      //TODO: Consider better way of conversion
      return authority.name.toString() === Role[role];
    });
  }
}

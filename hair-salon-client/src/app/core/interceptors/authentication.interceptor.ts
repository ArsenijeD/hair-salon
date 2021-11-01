import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationStorageManagementService } from '../services/session-management.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private session: ApplicationStorageManagementService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt = this.session.get('token');
    if(!jwt) {
      return next.handle(request);
    } 
    const clonedRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + jwt)
    });
    return next.handle(clonedRequest);
  }
}

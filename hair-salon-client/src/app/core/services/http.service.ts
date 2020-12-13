import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post<T, V>(url: string, data: T): Observable<V> {
    return this.http.post<V>(
      `${environment.baseUrl}${url}`,
      data
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.status);
      })
    );
  }
}

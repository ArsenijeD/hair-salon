import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStorageManagementService {

  constructor() { }

  save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key:string): T {
    return JSON.parse(localStorage.getItem(key));
  }
}

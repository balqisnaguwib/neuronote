// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logout() {
    console.log("logged out successfuly");
    sessionStorage.clear(); 
    return this.http.post('/', {});

  
  }
}

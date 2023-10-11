import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private baseUrl = 'http://localhost:3310/user';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }
}

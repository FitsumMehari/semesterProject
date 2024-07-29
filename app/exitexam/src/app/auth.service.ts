import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManagetokenService } from './managetoken.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: any) {
    const url = 'http://localhost:3000/auth/register';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, user, httpOptions);
  }

  login(user: any): Observable<any> {
    const url = 'http://localhost:3000/auth/login';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(url, user, httpOptions);
  }

  isAuthenticated(token: any) {
    const url = 'http://localhost:3000/auth/verifylogin';
    const httpOptions = {
      headers: new HttpHeaders({ token: `token ${token}` }),
    };

    return this.http.get(url, httpOptions).subscribe(
      (next) => {
        localStorage.setItem('isLoggedIn', 'true');
      },
      (error) => {
        localStorage.setItem('isLoggedIn', 'false');
      }
    );
  }

  getUserDetails(token: any): Observable<any> {
    const url = 'http://localhost:3000/auth/profile';
    const httpOptions = {
      headers: new HttpHeaders({ token: `token ${token}` }),
    };

    return this.http.get(url, httpOptions);
  }
}

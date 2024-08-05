import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // register(user: any) {
  //   const url = environment.apiURL + 'auth/register';
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   };
  //   return this.http.post(url, user, httpOptions);
  // }

  login(user: any): Observable<any> {

    const url = environment.apiURL + 'auth/login';

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(url, user, httpOptions);
  }

  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}

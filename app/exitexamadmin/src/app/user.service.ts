import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getAllUsers() {

    const url = environment.apiURL + 'user/:all';

    // const url = `http://localhost:3000/material/:${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  getSingleUser(userId: any) {
    const url = environment.apiURL + 'user/' + userId;

    // const url = `http://localhost:3000/material/:${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  addUser(user:any) {
    const url = environment.apiURL + 'user/';
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(url, user, httpOptions);
  }

  deleteUser(userId:any) {
    const url = environment.apiURL + 'user/:' + userId;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete(url, httpOptions);
  }

  updateUser(user:any) {
    const url = environment.apiURL + 'user/';
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(url, user, httpOptions);
  }
}

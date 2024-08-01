import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private http: HttpClient) {}

  getMaterials(fieldofstudy: any) {
    const url = environment.apiURL + 'material/:' + fieldofstudy;

    // const url = `http://localhost:3000/material/:${fieldofstudy}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  getAllMaterials(userId: any) {
    const url = environment.apiURL + 'material/:' + userId;

    // const url = `http://localhost:3000/material/:${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  // The following code needs revision as to what the getItem('id) is referrring to on the api
  editMaterial(material: any) {
    const url = environment.apiURL + 'material/:';

    // const url = `http://localhost:3000/material/:${localStorage.getItem('id')}`;
    console.log(material._id);

    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put(url, material, httpOptions);
  }

  // The following code needs revision as to what the getItem('id) is referrring to on the api

  addMaterial(material: any) {
    const url = environment.apiURL + 'material/:';

    // const url = `http://localhost:3000/material/:${localStorage.getItem('id')}`;

    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, material, httpOptions);
  }

  deleteMaterial(material: any) {
    const url = environment.apiURL + 'material/:' + material._id;

    // const url = `http://localhost:3000/material/:${material._id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.delete(url, httpOptions);
  }
}

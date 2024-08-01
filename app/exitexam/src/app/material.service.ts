import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private http: HttpClient) {}

  getMaterials(fieldofstudy:any) {
    const url = `http://localhost:3000/material/:${fieldofstudy}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  getAllMaterials(userId:any) {
    const url = `http://localhost:3000/material/:${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  editMaterial(material: any) {
    const url = `http://localhost:3000/material/:${localStorage.getItem('id')}`;
    console.log(material._id);

    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put(url, material, httpOptions);
  }

  addMaterial(material: any) {
    const url = `http://localhost:3000/material/:${localStorage.getItem('id')}`;

    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, material, httpOptions);

  }

  deleteMaterial(material: any) {

    const url = `http://localhost:3000/material/:${material._id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.delete(url, httpOptions);

  }
}

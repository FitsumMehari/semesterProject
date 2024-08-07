import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {



  constructor(private http : HttpClient) { }

  getAllMaterials() {

    const url = environment.apiURL + 'admin-material/:all';

    // const url = `http://localhost:3000/material/:${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  getSingleUser(userId: any) {
    const url = environment.apiURL + 'admin-material/' + userId;

    // const url = `http://localhost:3000/material/:${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  addMaterial(material:any) {
    const url = environment.apiURL + 'admin-material/';
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(url, material, httpOptions);
  }

  deleteMaterial(materialId:any) {
    const url = environment.apiURL + 'admin-material/:' + materialId;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete(url, httpOptions);
  }

  updateMaterial(material:any) {
    const url = environment.apiURL + 'admin-material/';
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(url, material, httpOptions);
  }

}

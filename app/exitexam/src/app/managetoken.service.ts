import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagetokenService {

  constructor() { }

  saveToken(token: any) {
    localStorage.setItem('token', token)
  }

  getToken(key:any) {
    return localStorage.getItem(key)
  }

  
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ManagetokenService } from '../managetoken.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-account',
  templateUrl: './page-account.component.html',
  styleUrl: './page-account.component.css',
})
export class PageAccountComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private manageToken: ManagetokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService
      .getUserDetails(this.manageToken.getToken('token'))
      .subscribe(
        (next) => {
          localStorage.setItem('username', next.username);
          localStorage.setItem('id', next._id);
          localStorage.setItem('email', next.email);
          localStorage.setItem('userType', next.userType);
          if (!!next.fieldofstudy) localStorage.setItem('fieldofstudy', next.fieldofstudy);
          this.router.navigate(['/profile']);
        },
        (error) => {
          alert('Wrong credentials');
          this.router.navigate(['sign-in'])
        }
      );
  }
  
  getName() {
    return localStorage.getItem('username');
  }
  getEmail() {
    return localStorage.getItem('email');
  }
  getId() {
    return localStorage.getItem('id');
  }
  getFieldOfStudy() {
    return localStorage.getItem('fieldofstudy');
  }
  getUserType() {
    return localStorage.getItem('userType');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['sign-in']);
  }
}

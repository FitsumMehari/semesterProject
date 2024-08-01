import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ManagetokenService } from '../managetoken.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-page-account',
  templateUrl: './page-account.component.html',
  styleUrl: './page-account.component.css',
})
export class PageAccountComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private tokenService: ManagetokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.subscription = this.tokenService.currentUser.subscribe(
    //   (loggedUser) => (this.user = loggedUser)
    // );
    let token = localStorage.getItem('token');
    if (!!token) {
      this.user = jwtDecode(token);
    } else {
      this.subscription = this.tokenService.currentUser.subscribe(
        (loggedUser) => (this.user = loggedUser)
      );
    }
  }
  subscription: Subscription | undefined;

  user: any = {};

  logout() {
    this.user = {
      id: '',
      isAdmin: false,
      email: '',
      username: '',
      userType: '',
      fieldofstudy: '',
      isLoggedIn: false,
    };
    localStorage.clear();
    this.tokenService.changeUser(this.user);
    this.router.navigate(['sign-in']);
  }
}

import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ManagetokenService } from './managetoken.service';
import { map, Subscription, take } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: ManagetokenService
  ) {}
  subscription: Subscription | undefined;

  isLoggedIn = false;
  user = {
    id: '',
    isAdmin: false,
    email: '',
    username: '',
    userType: '',
    fieldofstudy: '',
    isLoggedIn: false,
  };

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (!!token) {
      this.user = jwtDecode(token);
    } else {
      this.subscription = this.tokenService.currentUser.subscribe(
        (loggedUser) => (this.user = loggedUser)
      );
    }
  }

  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if (!!token) {
      this.user = jwtDecode(token);
    } else {
      this.subscription = this.tokenService.currentUser.subscribe(
        (loggedUser) => (this.user = loggedUser)
      );
    }

    if (this.user.isLoggedIn && this.user.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}

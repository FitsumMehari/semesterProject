import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ManagetokenService } from './managetoken.service';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private manageTokenService: ManagetokenService
  ) {}

  isLoggedIn = false;

  canActivate(): boolean {
    this.authService.isAuthenticated(this.manageTokenService.getToken('token'));
    this.authService.getUserDetails(this.manageTokenService.getToken('token'));
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    } else {
      // alert("You need to be loged in to access this page!")
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { ManagetokenService } from '../managetoken.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css',
})
export class PageLoginComponent {
  constructor(
    private authService: AuthService,
    private manageToken: ManagetokenService,
    private router: Router
  ) {}

  user = {
    email: '',
    password: '',
  };
  loginUser() {
    // this.authService.login(this.user).subscribe(
    //   (next) => {
    //     this.manageToken.saveToken(next.accessToken);
    //     this.router.navigate(['/profile']);
    //   },
    //   (error) => {
    //     alert('Wrong credentials');
    //   }
    // );
    this.authService.login(this.user).subscribe(
      (next) => {
        let userDetails = {
          id: '',
          isAdmin: false,
          email: '',
          username: '',
          userType: '',
          fieldofstudy: '',
          isLoggedIn: false,
        };
        localStorage.setItem('token', next.accessToken);
        userDetails = jwtDecode(next.accessToken);

        this.authService.authenticated$.next(userDetails.isLoggedIn);
        this.manageToken.changeUser(userDetails);
        this.router.navigate(['/profile']);
      },
      (error) => {
        alert('Wrong credentials');
        this.user = { email: '', password: '' };
      }
    );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth.service';
import { ManagetokenService } from '../managetoken.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(
    private authService: AuthService,
    private manageToken: ManagetokenService,
    private router: Router
  ) // private rendered: Renderer2
  {}

  user = {
    email: '',
    password: '',
  };
  loginUser() {
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
        this.router.navigate(['home']);
        // this.router.navigate(['home/overview']);
      },
      (error) => {
        alert('Wrong credentials');
        this.user = { email: '', password: '' };
      }
    );
  }

  togglePassword(elementId: any) {
    let element = document.getElementById(elementId);

    if (element?.getAttribute('type') == 'password') {
      element.setAttribute('type', 'text');
    } else if (element?.getAttribute('type') == 'text') {
      element.setAttribute('type', 'password');
    }
  }
}

import { Component, Renderer2 } from '@angular/core';
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
    private router: Router,
    private rendered: Renderer2
  ) {}

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
        this.router.navigate(['/profile']);
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

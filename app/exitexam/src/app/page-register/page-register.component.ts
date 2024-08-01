import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrl: './page-register.component.css',
})
export class PageRegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  user = {
    username: '',
    email: '',
    fieldofstudy: '',
    password: '',
  };
  registerUser() {
    this.authService.register(this.user).subscribe(
      (next) => {
        alert('Account Created Successfully!');
        this.router.navigate(['sign-in']);
      },
      (error) => {}
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

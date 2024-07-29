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
        alert("Account Created Successfully!");
        this.router.navigate(['sign-in'])
      },
      (error) => {}
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ManagetokenService } from '../managetoken.service';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private tokenService: ManagetokenService) {
    subscription: Subscription;
  }

  subscription: Subscription | undefined;

  user: any = {};
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

  loggedIn() {
    return this.user.isLoggedin;
  }
}

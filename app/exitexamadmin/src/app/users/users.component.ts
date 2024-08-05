import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ManagetokenService } from '../managetoken.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService, private tokenService: ManagetokenService) {}

  subscription: Subscription | undefined;

  loggedUser: any = {};

  users: any = [];
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

   
    this.userService.getAllUsers().subscribe(
      (next) => {
        this.users = next;
      },
      (error) => {}
    );
  }
}

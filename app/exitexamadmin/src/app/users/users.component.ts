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
  constructor(
    private userService: UserService,
    private tokenService: ManagetokenService
  ) {}

  subscription: Subscription | undefined;

  filterInput: any

  loggedUser: any = {};

  newUser = {
    isAdmin: false,
    email: '',
    username: '',
    userType: '',
    fieldofstudy: '',
    password: '',
  };

  users: any = [];

  selectedUserId = ''


  user = {
    id: '',
    isAdmin: false,
    email: '',
    username: '',
    userType: '',
    fieldofstudy: '',
    isLoggedIn: false,
  };

  buttonStatus = "Add User"

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (!!token) {
      this.user = jwtDecode(token);
    } else {
      this.subscription = this.tokenService.currentUser.subscribe(
        (loggedUser) => (this.user = loggedUser)
      );
    }
    // Refresh The List
    this.userService.getAllUsers().subscribe(
      (next) => {
        this.users = next;
      },
      (error) => {}
    );
  }

  addUser() {
    if (this.buttonStatus == "Add User") {
      this.newUser.isAdmin = this.newUser.userType == 'admin' ? true : false;
    this.userService.addUser(this.newUser).subscribe(
      (next) => {
        alert('Success!');
        this.newUser = {
          isAdmin: false,
          email: '',
          username: '',
          userType: '',
          fieldofstudy: '',
          password: '',
        };
        this.userService.getAllUsers().subscribe(
          (next) => {
            this.users = next;
          },
          (error) => {}
        );
      },
      (error) => {}
    );
    } else if (this.buttonStatus == "Update User") {
      this.updateUser(this.selectedUserId)
    }
  }

  deleteUser(userId: any) {
    this.users.forEach((user: any) => {
      if (user._id == userId) {
        let toDelete = confirm(
          'Are you sure you want to delete ' + user.username + "'s account?"
        );

        if (toDelete) {
          this.userService.deleteUser(userId).subscribe(
            (next) => {
              alert('User Account Deleted!');
            },
            (error) => {}
          );
        }
      }
    });
    // Refresh The List
    this.userService.getAllUsers().subscribe(
      (next) => {
        this.users = next;
      },
      (error) => {}
    );
  }

  selectUser(userId: any) {
    this.users.forEach((user: any) => {
      if (user._id == userId) {
        user.isAdmin = user.userType == 'admin' ? true : false;
        this.selectedUserId = user._id;
        this.newUser = user;

        this.buttonStatus = "Update User"
        // console.log(this.newUser);
      }
    });
  }

  updateUser(userId: any) {
    this.users.forEach((user: any) => {
      if (user._id == userId) {
        let toUpdate = confirm(
          'Are you sure you want to update ' + user.username + "'s account?"
        );

        if (toUpdate) {
          let {password, ...otherUserDetails} = user
          this.userService.updateUser(otherUserDetails).subscribe(
            (next) => {
              alert('User Account Updated!');
              this.newUser = {
                isAdmin: false,
                email: '',
                username: '',
                userType: '',
                fieldofstudy: '',
                password: '',
              };
              this.buttonStatus = "Add User"
               // Refresh The List
    this.userService.getAllUsers().subscribe(
      (next) => {
        this.users = next;
      },
      (error) => {}
    );
            },
            (error) => {}
          );
        }
      }
    });

  }
}

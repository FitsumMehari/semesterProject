import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'exitexam';

  username:any = ''

  ngOnInit(): void {
      this.username = localStorage.getItem("username");
      console.log(this.username);

  }



  loggedIn(){
    if(localStorage.getItem("isLoggedIn") === "true") return true;
    else return false;
  }
}

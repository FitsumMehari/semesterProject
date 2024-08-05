import { Component } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { ManagetokenService } from '../managetoken.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private router: Router, private tokenService: ManagetokenService) {}
  logout() {
    let user = {}
    localStorage.clear();
    this.tokenService.changeUser(user);
    this.router.navigate(['sign-in']);
  }
}

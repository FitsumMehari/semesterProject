import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  constructor(private userService: UserService, private materialService: MaterialService) {}

  users: any
  materials: any

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (next) => {
        this.users = next;
      },
      (error) => {}
    );
    this.materialService.getAllMaterials().subscribe(
      (next) => {
        this.materials = next;
      },
      (error) => {}
    );
  }
}

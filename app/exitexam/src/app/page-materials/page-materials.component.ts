import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';
import { ManagetokenService } from '../managetoken.service';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-page-materials',
  templateUrl: './page-materials.component.html',
  styleUrl: './page-materials.component.css',
})
export class PageMaterialsComponent implements OnInit {
  constructor(
    private materialService: MaterialService,
    private tokenService: ManagetokenService
  ) {}

  materials: any = [];
  material: any = {
    title: '',
    materialURL: '',
    fieldofstudy: '',
  };

  ngOnInit(): void {
    // this.subscription = this.tokenService.currentUser.subscribe(
    //   (loggedUser) => (this.user = loggedUser)
    // );

    let token = localStorage.getItem('token');
    if (!!token) {
      this.user = jwtDecode(token);
    } else {
      this.subscription = this.tokenService.currentUser.subscribe(
        (loggedUser) => (this.user = loggedUser)
      );
    }

    if (this.user.isAdmin) {
      this.getAllMaterials();
    } else {
      this.getMaterials(this.user.fieldofstudy);
    }
  }

  subscription: Subscription | undefined;

  user: any = {};



  getAllMaterials() {
    this.materialService.getAllMaterials(this.user.id).subscribe(
      (next) => {
        // this.materials = Object.assign({}, next);
        this.materials = next;
      },
      (error) => {}
    );
  }

  getMaterials(fieldofstudy:any) {
    this.materialService.getMaterials(fieldofstudy).subscribe(
      (next) => {
        // this.materials = Object.assign({}, next);
        this.materials = next;
      },
      (error) => {}
    );
  }

  selectMaterial(id: any) {
    this.materials.forEach((material: any) => {
      if (material._id === id) {
        this.material = material;
      }
    });
  }

  saveMaterial() {
    this.materialService.editMaterial(this.material).subscribe(
      (next) => {
        this.getAllMaterials();
      },
      (error) => {}
    );
  }

  addMaterial() {

    this.materialService.addMaterial(this.material).subscribe(
      (next) => {
        this.getAllMaterials();
      },
      (error) => {}
    );
  }

  deleteMaterial(id: any) {
    this.selectMaterial(id);
    let confirmed = confirm(`Are you sure to delete ${this.material.title}`);
    if (confirmed) {
      this.materialService.deleteMaterial(this.material).subscribe(
        (next) => {
          this.getAllMaterials();
        },
        (error) => {}
      );
    } else {
      this.getAllMaterials();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-page-materials',
  templateUrl: './page-materials.component.html',
  styleUrl: './page-materials.component.css',
})
export class PageMaterialsComponent implements OnInit {
  constructor(private materialService: MaterialService) {}

  materials: any = [];
  material: any = {
    title: '',
    materialURL: '',
    fieldofstudy: '',
  };
  isAdmin: boolean = false;

  ngOnInit(): void {
    if (this.checkAdmin()) {
      this.getAllMaterials();
    } else {
      this.getMaterials();
    }
  }

  checkAdmin() {
    let accountType = localStorage.getItem('userType');
    if (accountType == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  getFieldOfStudy() {
    return localStorage.getItem('fieldofstudy');
  }

  getAllMaterials() {
    this.materialService.getAllMaterials().subscribe(
      (next) => {
        // this.materials = Object.assign({}, next);
        this.materials = next;
      },
      (error) => {}
    );
  }

  getMaterials() {
    this.materialService.getMaterials().subscribe(
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
    console.log(this.material);

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

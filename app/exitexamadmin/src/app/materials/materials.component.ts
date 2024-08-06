import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { ManagetokenService } from '../managetoken.service';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.css',
})
export class MaterialsComponent {
  constructor(
    private materialService: MaterialService,
    private tokenService: ManagetokenService
  ) {}

  subscription: Subscription | undefined;

  filterInput:any
  
  loggedUser: any = {};

  newMaterial = {
    title: '',
    fieldofstudy: '',
    materialURL: '',
  };

  materials: any = [];

  selectedMaterialId = '';

  material = {
    title: '',
    fieldofstudy: '',
    materialURL: '',
  };

  user = {
    id: '',
    isAdmin: false,
    email: '',
    username: '',
    userType: '',
    fieldofstudy: '',
    isLoggedIn: false,
  };

  buttonStatus = 'Add Material';

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
    this.materialService.getAllMaterials().subscribe(
      (next) => {
        this.materials = next;
      },
      (error) => {}
    );
  }

  addMaterial() {
    if (this.buttonStatus == 'Add Material') {
      this.materialService.addMaterial(this.newMaterial).subscribe(
        (next) => {
          alert('Success!');
          this.newMaterial = {
            title: '',
            fieldofstudy: '',
            materialURL: '',
          };
          this.materialService.getAllMaterials().subscribe(
            (next) => {
              this.materials = next;
            },
            (error) => {}
          );
        },
        (error) => {}
      );
    } else if (this.buttonStatus == 'Update Material') {
      this.updateMaterial(this.selectedMaterialId);
    }
  }

  deleteMaterial(materialId: any) {
    this.materials.forEach((material: any) => {
      if (material._id == materialId) {
        let toDelete = confirm(
          'Are you sure you want to delete ' + material.title + '?'
        );

        if (toDelete) {
          this.materialService.deleteMaterial(materialId).subscribe(
            (next) => {
              alert('Material Deleted!');
            },
            (error) => {}
          );
        }
      }
    });
    // Refresh The List
    this.materialService.getAllMaterials().subscribe(
      (next) => {
        this.materials = next;
      },
      (error) => {}
    );
  }

  selectMaterial(materialId: any) {
    this.materials.forEach((material: any) => {
      if (material._id == materialId) {
        this.selectedMaterialId = material._id;
        this.newMaterial = material;

        this.buttonStatus = 'Update Material';
        // console.log(this.newUser);
      }
    });
  }

  updateMaterial(materialId: any) {
    this.materials.forEach((material: any) => {
      if (material._id == materialId) {
        let toUpdate = confirm(
          'Are you sure you want to update ' + material.title + '?'
        );

        if (toUpdate) {
          this.materialService.updateMaterial(material).subscribe(
            (next) => {
              alert('Material Updated!');
              this.newMaterial = {
                title: '',
                fieldofstudy: '',
                materialURL: '',
              };
              this.buttonStatus = 'Add Material';
              // Refresh The List
              this.materialService.getAllMaterials().subscribe(
                (next) => {
                  this.materials = next;
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

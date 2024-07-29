import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMaterialsComponent } from './page-materials.component';

describe('PageMaterialsComponent', () => {
  let component: PageMaterialsComponent;
  let fixture: ComponentFixture<PageMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

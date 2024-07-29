import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageExamComponent } from './page-exam.component';

describe('PageExamComponent', () => {
  let component: PageExamComponent;
  let fixture: ComponentFixture<PageExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRowComponent } from './patient-row.component';

describe('PatientRowComponent', () => {
  let component: PatientRowComponent;
  let fixture: ComponentFixture<PatientRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtHeaderComponent } from './pt-header.component';

describe('PtHeaderComponent', () => {
  let component: PtHeaderComponent;
  let fixture: ComponentFixture<PtHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

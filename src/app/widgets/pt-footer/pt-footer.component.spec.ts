import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtFooterComponent } from './pt-footer.component';

describe('PtFooterComponent', () => {
  let component: PtFooterComponent;
  let fixture: ComponentFixture<PtFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

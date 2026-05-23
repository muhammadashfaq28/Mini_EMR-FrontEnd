import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionSection } from './prescription-section';

describe('PrescriptionSection', () => {
  let component: PrescriptionSection;
  let fixture: ComponentFixture<PrescriptionSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisSection } from './diagnosis-section';

describe('DiagnosisSection', () => {
  let component: DiagnosisSection;
  let fixture: ComponentFixture<DiagnosisSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosisSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosisSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

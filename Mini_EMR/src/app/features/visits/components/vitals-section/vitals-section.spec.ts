import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsSection } from './vitals-section';

describe('VitalsSection', () => {
  let component: VitalsSection;
  let fixture: ComponentFixture<VitalsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

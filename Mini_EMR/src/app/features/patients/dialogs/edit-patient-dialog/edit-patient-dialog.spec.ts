import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientDialog } from './edit-patient-dialog';

describe('EditPatientDialog', () => {
  let component: EditPatientDialog;
  let fixture: ComponentFixture<EditPatientDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPatientDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

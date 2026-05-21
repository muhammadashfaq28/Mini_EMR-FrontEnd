import {
  Component,
  Inject,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PatientsService } from '../../services/patients.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-patient-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogActions,
    MatDialogContent,
    MatSnackBarModule
  ],

  templateUrl: './edit-patient-dialog.html',

  styleUrl: './edit-patient-dialog.css'
})
export class EditPatientDialog {
  // INJECTIONS

  private fb = inject(FormBuilder);
  private patientsService = inject(PatientsService);
  private dialogRef = inject(MatDialogRef<EditPatientDialog>);
  private snackBar = inject(MatSnackBar);

  // STATES 
  isSaving = false;
  // FORM 

  patientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    cnic: ['', Validators.required],

    phoneNumber: ['', Validators.required],

    bloodGroup: [''],

    address: ['']
  });

  //  CONSTRUCTOR 
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any) {
    this.patientForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      cnic: data.cnic,
      phoneNumber: data.phoneNumber,
      bloodGroup: data.bloodGroup,
      address: data.address
    });
  }

  // UPDATE 
  update(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    this.patientsService
      .updatePatient(
        this.data.id,
        this.patientForm.value)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.snackBar.open(
            'Patient updated successfully',
            'Close',
            {
              duration: 3000,

              horizontalPosition: 'center',

              verticalPosition: 'top'
            });
          
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(
            'Failed to update patient',
            err);

          this.isSaving = false;
        }
      });
  }

  // CLOSE 
  close(): void {
    this.dialogRef.close(false);
  }
}
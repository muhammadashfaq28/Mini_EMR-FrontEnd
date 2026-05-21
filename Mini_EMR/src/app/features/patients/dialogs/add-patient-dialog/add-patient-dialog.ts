import {
  Component,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PatientsService } from '../../services/patients.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-patient-dialog',

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

  templateUrl:
    './add-patient-dialog.html',

  styleUrl:
    './add-patient-dialog.css'
})
export class AddPatientDialog
{
  private fb = inject(FormBuilder);
  private patientsService = inject(PatientsService);
  private dialogRef = inject(MatDialogRef<AddPatientDialog>);
  private snackBar = inject(MatSnackBar);
  isSaving = false;

  patientForm = this.fb.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    gender: ['', Validators.required],
    cnic: ['',Validators.required],
    phoneNumber: ['',Validators.required],

    bloodGroup: [''],address: ['']
  });



  save(): void
  {
    if (this.patientForm.invalid)
    {
      this.patientForm.markAllAsTouched();
         return;
    }

    this.isSaving = true;

    this.patientsService.createPatient( this.patientForm.value)
      .subscribe({
        next: () =>
        {
          this.isSaving = false;
          this.snackBar.open(
            'Patient saved successfully',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
          this.dialogRef.close(true);
        },
        error: (err) =>
        {
          console.error(
            'Failed to save patient',err);
          this.isSaving = false;
        }
      });
  }

  close(): void
  {
    this.dialogRef.close(false);
  }
}
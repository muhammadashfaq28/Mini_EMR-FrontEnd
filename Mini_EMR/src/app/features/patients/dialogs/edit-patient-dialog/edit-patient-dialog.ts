import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PatientsService } from '../../services/patients.service';
import { PatientModel, UpdatePatientRequestModel, Gender } from '../../../../shared/models/patient.model';

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
    MatSnackBarModule,
    MatDatepickerModule
  ],
  templateUrl: './edit-patient-dialog.html',
  styleUrl: './edit-patient-dialog.css'
})
export class EditPatientDialog {
  private readonly fb = inject(FormBuilder);
  private readonly patientsService = inject(PatientsService);
  private readonly dialogRef = inject(MatDialogRef<EditPatientDialog>);
  private readonly snackBar = inject(MatSnackBar);

  isSaving = false;

  patientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dateOfBirth: this.fb.control<Date | null>(null, Validators.required),
    cnic: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    bloodGroup: [''],
    address: ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PatientModel
  ) {
    this.patientForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      cnic: data.cnic ?? '',
      phoneNumber: data.phoneNumber,
      bloodGroup: data.bloodGroup ?? '',
      address: data.address ?? ''
    });
  }

  update(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const formValue = this.patientForm.getRawValue();

    const request: UpdatePatientRequestModel = {
      id: this.data.id,
      firstName: formValue.firstName ?? '',
      lastName: formValue.lastName ?? '',
      gender: (formValue.gender as Gender) ?? 'Male',
      dateOfBirth: formValue.dateOfBirth
        ? new Date(formValue.dateOfBirth as Date).toISOString().split('T')[0]
        : '',
      cnic: formValue.cnic || null,
      phoneNumber: formValue.phoneNumber ?? '',
      bloodGroup: formValue.bloodGroup || null,
      address: formValue.address || null
    };

    this.isSaving = true;

    this.patientsService.updatePatient(this.data.id, request).subscribe({
      next: () => {
        this.isSaving = false;

        this.snackBar.open('Patient updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this.dialogRef.close(true);
      },
      error: err => {
        console.error('Failed to update patient', err);
        this.isSaving = false;
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
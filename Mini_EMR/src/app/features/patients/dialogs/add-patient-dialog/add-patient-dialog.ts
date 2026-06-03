import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { PatientsService } from '../../services/patients.service';
import { CreatePatientRequestModel, Gender } from '../../../../shared/models/patient.model';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { cnicValidator } from '../../../../shared/validators/cnic.validator';
import { phoneNumberValidator } from '../../../../shared/validators/phone-number.validator';

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
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-patient-dialog.html',
  styleUrl: './add-patient-dialog.css'
})
export class AddPatientDialog {
  private readonly fb = inject(FormBuilder);
  private readonly patientsService = inject(PatientsService);
  private readonly dialogRef = inject(MatDialogRef<AddPatientDialog>);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);

  isSaving = false;

  patientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dateOfBirth: this.fb.control<Date | null>(null, Validators.required),
    cnic: ['', [Validators.required, cnicValidator()]],
    phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
    bloodGroup: [''],
    address: ['']
  });

  save(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const formValue = this.patientForm.getRawValue();

    const request: CreatePatientRequestModel = {
      firstName: formValue.firstName ?? '',
      lastName: formValue.lastName ?? '',
      gender: (formValue.gender as Gender) ?? 'Male',
      dateOfBirth: formValue.dateOfBirth
        ? new Date(formValue.dateOfBirth).toISOString().split('T')[0]
        : '',
      cnic: formValue.cnic || null,
      phoneNumber: formValue.phoneNumber ?? '',
      bloodGroup: formValue.bloodGroup || null,
      address: formValue.address || null
    };

    this.isSaving = true;

    this.patientsService.createPatient(request).subscribe({
      next: () => {
        this.isSaving = false;
        this.cdr.detectChanges();
        this.snackBar.open('Patient saved successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.dialogRef.close(true);
      },
      error: err => {
        console.error('Failed to save patient', err);
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
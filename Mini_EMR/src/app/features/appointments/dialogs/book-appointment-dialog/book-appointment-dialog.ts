import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { PatientsService } from '../../../patients/services/patients.service';
import { AuthApiService } from '../../../auth/services/auth-api.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
  selector: 'app-book-appointment-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule
  ],
  templateUrl: './book-appointment-dialog.html',
  styleUrl: './book-appointment-dialog.css'
})
export class BookAppointmentDialog implements OnInit {

  // Injections
  private fb = inject(FormBuilder);
  private patientsService = inject(PatientsService);
  private authApiService = inject(AuthApiService);
  private dashboardService = inject(DashboardService);
  private dialogRef = inject(MatDialogRef<BookAppointmentDialog>);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  // States
  isSaving = false;

  // Data
  patients = signal<any[]>([]);
  doctors = signal<any[]>([]);
  filteredPatients = signal<any[]>([]);
  filteredDoctors = signal<any[]>([]);

  // Search
  patientSearch = '';
  doctorSearch = '';

  // Form
  appointmentForm = this.fb.group({
    patientId: ['', Validators.required],
    doctorId: ['', Validators.required],
    appointmentDate: ['', Validators.required],
    appointmentTime: ['', Validators.required],
    notes: ['']
  });

  ngOnInit(): void {
    this.loadPatients();
    this.loadDoctors();
  }

  loadPatients(): void {
    this.patientsService.getPatients().subscribe({
      next: (response: any) => {
        this.patients.set(response.patients);
        this.filteredPatients.set(response.patients);
      }
    });
  }

  loadDoctors(): void {
    this.authApiService.getDoctors().subscribe({
      next: (response: any) => {
        this.doctors.set(response);
        this.filteredDoctors.set(response);
      }
    });
  }

  onPatientSearch(): void {
    const search = this.patientSearch.toLowerCase();
    const filtered = this.patients().filter(patient =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(search)
    );
    this.filteredPatients.set(filtered);
  }

  onDoctorSearch(): void {
    const search = this.doctorSearch.toLowerCase();
    const filtered = this.doctors().filter(doctor =>
      doctor.fullName.toLowerCase().includes(search)
    );
    this.filteredDoctors.set(filtered);
  }

  save(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const form = this.appointmentForm.value;
    const selectedDate =
      new Date(form.appointmentDate!);

    const [hours, minutes] =
      form.appointmentTime!
        .split(':')
        .map(Number);

    selectedDate.setHours(hours);

    selectedDate.setMinutes(minutes);

    selectedDate.setSeconds(0);

    const appointmentDateTime =
      selectedDate.toISOString();

    const payload = {
      patientId: Number(form.patientId),
      doctorId: Number(form.doctorId),
      appointmentDateTime,
      notes: form.notes
    };

    this.dashboardService.bookAppointment(payload).subscribe({
      next: () => {
        this.isSaving = false;

        this.cdr.detectChanges();

        this.snackBar.open(
          'Appointment booked successfully',
          'Close',
          {
            duration: 3000,

            horizontalPosition: 'center',

            verticalPosition: 'top'
          });

        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Failed to book appointment', err);
        this.isSaving = false;
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
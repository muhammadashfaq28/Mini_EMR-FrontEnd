import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService, BookAppointmentRequestModel } from '../../services/appointment.service';
import { PatientModel } from '../../../../shared/models/patient.model';
import { UserModel } from '../../../../shared/models/user.model';

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
  private readonly fb = inject(FormBuilder);
  private readonly appointmentService = inject(AppointmentService);
  private readonly dialogRef = inject(MatDialogRef<BookAppointmentDialog>);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      patientId?: number;
      patientName?: string;
    }
  ) { }

  isPatientLocked = false;
  isSaving = false;


  patients = signal<PatientModel[]>([]);
  doctors = signal<UserModel[]>([]);
  filteredPatients = signal<PatientModel[]>([]);
  filteredDoctors = signal<UserModel[]>([]);

  patientSearch = '';
  doctorSearch = '';

  appointmentForm = this.fb.group({
    patientId: [null as number | null, Validators.required],
    doctorId: [null as number | null, Validators.required],
    appointmentDate: ['', Validators.required],
    appointmentTime: ['', Validators.required],
    notes: ['']
  });

  ngOnInit(): void {

    this.loadPatients();
    this.loadDoctors();

    if (this.data?.patientId) {

      this.isPatientLocked = true;
      this.appointmentForm.patchValue({
        patientId: this.data.patientId
      });
    }
  }

  loadPatients(): void {
    this.appointmentService.getPatients().subscribe({
      next: response => {
        this.patients.set(response.patients);
        this.filteredPatients.set(response.patients);
      },
      error: err => {
        console.error('Failed to load patients', err);
      }
    });
  }

  loadDoctors(): void {
    this.appointmentService.getDoctors().subscribe({
      next: response => {
        this.doctors.set(response);
        this.filteredDoctors.set(response);
      },
      error: err => {
        console.error('Failed to load doctors', err);
      }
    });
  }

  onPatientSearch(): void {
    const search = this.patientSearch.toLowerCase().trim();
    const filtered = this.patients().filter(patient =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(search)
    );

    this.filteredPatients.set(filtered);
  }

  onDoctorSearch(): void {
    const search = this.doctorSearch.toLowerCase().trim();
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

    const form = this.appointmentForm.getRawValue();

    const selectedDate = new Date(form.appointmentDate ?? '');
    const [hours, minutes] = (form.appointmentTime ?? '00:00').split(':').map(Number);

    selectedDate.setHours(hours || 0, minutes || 0, 0, 0);

    const payload: BookAppointmentRequestModel = {
      patientId: Number(form.patientId),
      doctorId: Number(form.doctorId),
      appointmentDateTime: selectedDate.toISOString(),
      notes: form.notes || null
    };

    this.appointmentService.bookAppointment(payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.cdr.detectChanges();

        this.snackBar.open('Appointment booked successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this.dialogRef.close(true);
      },
      error: err => {
        console.error('Failed to book appointment', err);
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
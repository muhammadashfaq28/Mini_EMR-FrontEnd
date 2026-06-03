import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../../../core/services/auth.service';

type AppointmentStatus = 'Booked' | 'CheckedIn' | 'Completed' | 'Cancelled';

interface DashboardAppointmentModel {
  id: number;
  patientId: number;
  patientName: string;
  age: number;
  gender: string;
  doctorName: string;
  appointmentDateTime: string;
  status: AppointmentStatus;
}

interface DashboardStatusCountsModel {
  total: number;
  booked: number;
  checkedIn: number;
  completed: number;
}

interface DoctorAppointmentModel {
  id: number;
  patientName: string;
  appointmentDateTime: string;
  status: AppointmentStatus;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  appointments = signal<DashboardAppointmentModel[]>([]);
  statusCounts = signal<DashboardStatusCountsModel | null>(null);
  doctorAppointments = signal<DoctorAppointmentModel[]>([]);

  selectedDate: Date | null = null;
  selectedStatus = '';

  displayedColumns: string[] = [
    'patient',
    'ageGender',
    'doctor',
    'dateTime',
    'status',
    'actions'
  ];

  ngOnInit(): void {
    this.refreshDashboard();
    this.dashboardService.appointmentCreated$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.refreshDashboard();
      });
  }

  loadDashboardData(): void {
    const date = this.selectedDate
      ? this.selectedDate.toLocaleDateString('en-CA')
      : '';

    this.dashboardService.getAppointments(date, this.selectedStatus).subscribe({
      next: (response: DashboardAppointmentModel[]) => this.appointments.set(response)
    });

    this.dashboardService.getStatusCounts(date).subscribe({
      next: (response: DashboardStatusCountsModel) => this.statusCounts.set(response)
    });
  }

  loadDoctorAppointments(): void {
    this.dashboardService.getDoctorTodayAppointments().subscribe({
      next: (response: DoctorAppointmentModel[]) => this.doctorAppointments.set(response)
    });
  }

  onFilterChange(): void {
    this.loadDashboardData();
  }

  refreshDashboard(): void {
    this.loadDashboardData();

    if (this.authService.isDoctor()) {
      this.loadDoctorAppointments();
    }
  }

  checkIn(id: number): void {
    this.dashboardService.checkInAppointment(id).subscribe({
      next: () => {
        this.refreshDashboard();
      },
      error: err => console.error('Check-in failed', err)
    });
  }

  cancel(id: number): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.dashboardService.cancelAppointment(id).subscribe({
        next: () => {
          this.refreshDashboard();
        },
        error: err => console.error('Cancel failed', err)
      });
    }
  }

  startVisit(id: number): void {
    this.router.navigate(['/visits', id]);
  }

  viewVisit(patientId: number): void {
    this.router.navigate(['/patients', patientId]);
  }
}
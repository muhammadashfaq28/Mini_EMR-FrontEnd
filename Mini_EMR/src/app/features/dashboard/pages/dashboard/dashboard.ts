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
import { provideNativeDateAdapter } from '@angular/material/core';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MatIcon } from "@angular/material/icon";

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
    MatIcon
  ],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  // Injections
  private dashboardService = inject(DashboardService);
  authService = inject(AuthService);
  router = inject(Router);

  // Signals
  appointments = signal<any[]>([]);
  statusCounts = signal<any>(null);
  doctorAppointments = signal<any[]>([]);

  // Filters
  selectedDate: Date | null = null;
  selectedStatus = '';

  // Table
  displayedColumns = [
    'patient',
    'ageGender',
    'doctor',
    'dateTime',
    'status',
    'actions'
  ];

  ngOnInit(): void {
    this.loadDashboardData();

    if (this.authService.isDoctor()) {
      this.loadDoctorAppointments();
    }
  }

  loadDashboardData(): void {
    let date = '';

    if (this.selectedDate) {
      date = this.selectedDate.toLocaleDateString('en-CA');
    }

    this.dashboardService.getAppointments(date, this.selectedStatus)
      .subscribe({
        next: (response: any) => this.appointments.set(response)
      });

    this.dashboardService.getStatusCounts(date)
      .subscribe({
        next: (response: any) => this.statusCounts.set(response)
      });
  }

  loadDoctorAppointments(): void {
    this.dashboardService.getDoctorTodayAppointments()
      .subscribe({
        next: (response: any) => this.doctorAppointments.set(response)
      });
  }

  onFilterChange(): void {
    this.loadDashboardData();
  }

  // Actions
  checkIn(id: number): void {
    this.dashboardService.checkInAppointment(id).subscribe({
      next: () => this.loadDashboardData(),
      error: (err) => console.error('Check-in failed', err)
    });
  }

  cancel(id: number): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.dashboardService.cancelAppointment(id).subscribe({
        next: () => this.loadDashboardData(),
        error: (err) => console.error('Cancel failed', err)
      });
    }
  }

  startVisit(id: number): void {
    this.router.navigate(['/visits', id]);
  }

  viewVisit(id: number): void {
    this.router.navigate(['/patients', id, 'visit']);
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BookAppointmentDialog } from '../../../appointments/dialogs/book-appointment-dialog/book-appointment-dialog';
import { PatientsService } from '../../services/patients.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { PatientModel } from '../../../../shared/models/patient.model';
import { VisitHistoryModel } from '../../../../shared/models/visit.model';
import { VitalStatusDirective } from '../../../../shared/directives/vital-status-directive';
import { BmiPipe } from "../../../../shared/pipes/bmi.pipe";
import { AgePipe } from "../../../../shared/pipes/age.pipe";
import { MatButtonModule } from '@angular/material/button';

type AppointmentStatus = 'Booked' | 'CheckedIn' | 'Completed' | 'Cancelled';

interface PatientAppointmentModel {
  id: number;
  patientId: number;
  patientName: string;
  age: number;
  gender: string;
  doctorName: string;
  appointmentDateTime: string;
  status: AppointmentStatus;
}

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, VitalStatusDirective, BmiPipe, AgePipe, MatButtonModule],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.css'
})
export class PatientDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly patientsService = inject(PatientsService);
  private readonly dashboardService = inject(DashboardService);
  private readonly dialog = inject(MatDialog);

  patient = signal<PatientModel | null>(null);
  activeAppointment = signal<PatientAppointmentModel | null>(null);
  visitHistory = signal<VisitHistoryModel[]>([]);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || Number.isNaN(id)) {
      return;
    }

    this.loadPatient(id);
    this.loadAppointments(id);
    this.loadVisitHistory(id);
  }

  loadPatient(id: number): void {
    this.patientsService.getPatientById(id).subscribe({
      next: response => this.patient.set(response)
    });
  }

  loadAppointments(patientId: number): void {
    this.dashboardService.getAppointments('', '').subscribe({
      next: response => {
        const active = response.find(
          appointment =>
            appointment.patientId === patientId &&
            (appointment.status === 'Booked' || appointment.status === 'CheckedIn')
        );

        this.activeAppointment.set(active ?? null);
      }
    });
  }

  loadVisitHistory(patientId: number): void {
    this.patientsService.getPatientVisits(patientId).subscribe({
      next: response => this.visitHistory.set(response),
      error: err => {
        console.error('Failed to load visit history', err);
        this.visitHistory.set([]);
      }
    });
  }

  getVitalStatus(type: string, value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return '';
    }

    const isNormal = this.isVitalNormal(type, numericValue);
    return isNormal ? 'Normal' : 'Abnormal';
  }

  private isVitalNormal(type: string, value: number): boolean {
    switch (type) {
      case 'bpSystolic':
        return value >= 90 && value <= 120;

      case 'bpDiastolic':
        return value >= 60 && value <= 80;

      case 'pulseBpm':
        return value >= 60 && value <= 100;

      case 'temperatureF':
        return value >= 97 && value <= 99;

      case 'temperatureC':
        return value >= 36.1 && value <= 37.2;

      case 'respiratoryRate':
        return value >= 12 && value <= 20;

      case 'bmi':
        return value >= 18.5 && value <= 24.9;

      case 'heightCm':
      case 'weightKg':
        return value > 0;

      default:
        return true;
    }
  }

  bookAppointment(): void {

    const patient = this.patient();

    if (!patient) {
      return;
    }

    this.dialog.open(
      BookAppointmentDialog,
      {
        width: '95%',
        maxWidth: '800px',
        disableClose: true,
        data: {
          patientId: patient.id,
          patientName: `${patient.firstName} ${patient.lastName}`
        }
      }
    );
  }

}
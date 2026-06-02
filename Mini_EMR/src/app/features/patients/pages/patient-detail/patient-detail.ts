import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { PatientsService } from '../../services/patients.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { PatientModel } from '../../../../shared/models/patient.model';
import { VisitHistoryModel } from '../../../../shared/models/visit.model';

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
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.css'
})
export class PatientDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly patientsService = inject(PatientsService);
  private readonly dashboardService = inject(DashboardService);

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

  loadVisitHistory(id: number): void {
    this.patientsService.getPatientVisits(id).subscribe({
      next: response => this.visitHistory.set(response)
    });
  }

}
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PatientsService } from '../../services/patients.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.css'
})
export class PatientDetail implements OnInit {

  // Injections
  private route = inject(ActivatedRoute);
  private patientsService = inject(PatientsService);
  private dashboardService = inject(DashboardService);

  // Signals
  patient = signal<any>(null);
  activeAppointment = signal<any>(null);
  visitHistory = signal<any[]>([]);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPatient(id);
    this.loadAppointments(id);
    this.loadVisitHistory(id);
  }

  loadPatient(id: number): void {
    this.patientsService.getPatientById(id).subscribe({
      next: (response: any) => this.patient.set(response)
    });
  }

  loadAppointments(patientId: number): void {
    this.dashboardService.getAppointments('', '').subscribe({
      next: (response: any[]) => {
        const active = response.find(a =>
          a.patientId === patientId &&
          (a.status === 'Booked' || a.status === 'CheckedIn')
        );
        this.activeAppointment.set(active);
      }
    });
  }

  loadVisitHistory(patientId: number): void {
    this.visitHistory.set([]);
  }
}
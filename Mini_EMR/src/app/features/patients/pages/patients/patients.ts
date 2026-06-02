import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { PatientsService } from '../../services/patients.service';
import { AddPatientDialog } from '../../dialogs/add-patient-dialog/add-patient-dialog';
import { EditPatientDialog } from '../../dialogs/edit-patient-dialog/edit-patient-dialog';
import { PatientModel } from '../../../../shared/models/patient.model';

interface PatientsResponse {
  patients: PatientModel[];
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './patients.html',
  styleUrl: './patients.css'
})
export class Patients implements OnInit {
  private readonly patientsService = inject(PatientsService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  patients = signal<PatientModel[]>([]);
  filteredPatients = signal<PatientModel[]>([]);

  searchText = '';

  displayedColumns: string[] = [
    'name',
    'gender',
    'phone',
    'cnic',
    'actions'
  ];

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientsService.getPatients().subscribe({
      next: (response: PatientsResponse) => {
        this.patients.set(response.patients);
        this.filteredPatients.set(response.patients);
      },
      error: err => {
        console.error('Failed to load patients', err);
      }
    });
  }

  onSearch(): void {
    const search = this.searchText.trim().toLowerCase();

    const filtered = this.patients().filter(patient =>
      patient.firstName.toLowerCase().includes(search) ||
      patient.lastName.toLowerCase().includes(search) ||
      patient.phoneNumber.toLowerCase().includes(search) ||
      (patient.cnic ?? '').toLowerCase().includes(search)
    );

    this.filteredPatients.set(filtered);
  }

  addPatient(): void {
    const dialogRef = this.dialog.open(AddPatientDialog, {
      maxWidth: '800px',
      width: '100%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPatients();
      }
    });
  }

  editPatient(patient: PatientModel): void {
    const dialogRef = this.dialog.open(EditPatientDialog, {
      width: '95%',
      maxWidth: '800px',
      disableClose: true,
      data: patient
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPatients();
      }
    });
  }

  viewPatient(id: number): void {
    this.router.navigate(['/patients', id]);
  }
}
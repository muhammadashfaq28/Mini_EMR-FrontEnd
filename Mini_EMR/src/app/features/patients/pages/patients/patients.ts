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
import { PatientsService } from '../../services/patients.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientDialog } from '../../dialogs/add-patient-dialog/add-patient-dialog';
import { EditPatientDialog } from '../../dialogs/edit-patient-dialog/edit-patient-dialog';
import { Router } from '@angular/router';

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

export class Patients
  implements OnInit {
  // Service

  private patientsService = inject(PatientsService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  // Signals

  patients = signal<any[]>([]);

  filteredPatients = signal<any[]>([]);

  // Search
  searchText = '';
  // Table
  displayedColumns = [
    'name',
    'gender',
    'phone',
    'cnic',
    'actions'
  ];
  // Init
  ngOnInit(): void {
    this.loadPatients();
  }

  // Load Patients

  loadPatients(): void {
    this.patientsService
      .getPatients()
      .subscribe({

        next: (response: any) => {
          this.patients.set(response.patients);
          this.filteredPatients.set(response.patients);
        },

        error: (err) => {
          console.error(
            'Failed to load patients',
            err
          );
        }
      });
  }

  // Search Filter
  onSearch(): void {
    const search = this.searchText.toLowerCase();
    const filtered = this.patients().filter(patient =>
      patient.firstName.toLowerCase().includes(search)
      ||
      patient.lastName.toLowerCase().includes(search)
      ||
      patient.phoneNumber.toLowerCase().includes(search)
      ||
      patient.cnic.includes(search)
    );

    this.filteredPatients.set(filtered);
  }

  // Actions

  addPatient(): void {
    const dialogRef = this.dialog.open(
      AddPatientDialog,
      {
        maxWidth: '800px',
        width: '100%',
        disableClose: true
      });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.loadPatients();
        }
      });
  }

  editPatient(patient: any): void {
    const dialogRef =
      this.dialog.open(
        EditPatientDialog,
        {
          width: '95%',
          maxWidth: '800px',
          disableClose: true,
          data: patient
        });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.loadPatients();
        }
      });
  }

  viewPatient(id: number): void {
    this.router.navigate(['/patients', id]);
  }
}
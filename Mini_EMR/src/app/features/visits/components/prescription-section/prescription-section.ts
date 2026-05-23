import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MedicinesService } from '../../../medicines/services/medicines';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-prescription-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
             MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatTableModule],
  templateUrl: './prescription-section.html',
  styleUrl: './prescription-section.css'
})
export class PrescriptionSection implements OnInit {

  // Injections
  private fb = inject(FormBuilder);
  private medicinesService = inject(MedicinesService);

  // Data
  medicines = signal<any[]>([]);

  // Form
  prescriptionForm = this.fb.group({
    prescriptions: this.fb.array([])
  });

  get prescriptions(): FormArray {
    return this.prescriptionForm.get('prescriptions') as FormArray;
  }

  ngOnInit(): void {
    this.loadMedicines();
    this.addPrescription();
  }

  loadMedicines(): void {
    this.medicinesService
      .getMedicines()
      .subscribe({

        next: (response: any) => {
          this.medicines.set(
            response.medicines
          );
        }
      });
  }

  createPrescription(): FormGroup {
    return this.fb.group({
      medicineId: [''],
      dosage: [''],
      frequency: [''],
      durationDays: [''],
      instructions: ['']
    });
  }

  addPrescription(): void {
    this.prescriptions.push(this.createPrescription());
  }

  removePrescription(index: number): void {
    this.prescriptions.removeAt(index);
  }
}
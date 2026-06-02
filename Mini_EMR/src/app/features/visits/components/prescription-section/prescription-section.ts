import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { MedicinesService } from '../../../medicines/services/medicines';
import { MedicineModel } from '../../../../shared/models/medicine.model';
import { PrescriptionRequestModel, PrescriptionFrequency } from '../../../../shared/models/visit.model';
import * as VisitActions from '../../store/visit.actions';

@Component({
  selector: 'app-prescription-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './prescription-section.html',
  styleUrl: './prescription-section.css'
})
export class PrescriptionSection implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly medicinesService = inject(MedicinesService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  medicines = signal<MedicineModel[]>([]);

  prescriptionForm = this.fb.group({
    prescriptions: this.fb.array<FormGroup>([])
  });

  get prescriptions(): FormArray<FormGroup> {
    return this.prescriptionForm.get('prescriptions') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.loadMedicines();

    this.prescriptionForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updatePrescriptions());

    this.addPrescription();
    this.updatePrescriptions();
  }

  loadMedicines(): void {
    this.medicinesService.getMedicines().subscribe({
      next: (response: MedicineModel[]) => {
        this.medicines.set(response);
      },
      error: () => {
        this.medicines.set([]);
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
    this.updatePrescriptions();
  }

  removePrescription(index: number): void {
    this.prescriptions.removeAt(index);
    this.updatePrescriptions();
  }

  private updatePrescriptions(): void {
    const prescriptions: PrescriptionRequestModel[] = this.prescriptions.controls.map(control => {
      const value = control.getRawValue() as {
        medicineId?: string | number | null;
        dosage?: string | null;
        frequency?: string | null;
        durationDays?: string | number | null;
        instructions?: string | null;
      };

      return {
        medicineId: Number(value.medicineId || 0),
        dosage: value.dosage || '',
        frequency: (value.frequency || 'Once daily') as PrescriptionFrequency,
        duration: value.durationDays ? String(value.durationDays) : '',
        instructions: value.instructions || null
      };
    });

    this.store.dispatch(VisitActions.setPrescriptions({ prescriptions }));
  }
}
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import * as VisitActions from '../../store/visit.actions';
import { VitalsModel } from '../../../../shared/models/visit.model';
import { VitalStatusDirective } from '../../../../shared/directives/vital-status-directive';

@Component({
  selector: 'app-vitals-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    VitalStatusDirective
  ],
  templateUrl: './vitals-section.html',
  styleUrl: './vitals-section.css'
})
export class VitalsSection implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  vitalsForm = this.fb.group({
    heightCm: [''],
    weightKg: [''],
    bpSystolic: [''],
    bpDiastolic: [''],
    pulseBpm: [''],
    temperatureC: [''],
    respiratoryRate: [''],
    bmi: [{ value: '', disabled: true }]
  });

  ngOnInit(): void {
    this.vitalsForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateVitals());

    this.updateVitals();
  }

  calculateBMI(): void {
    const height = Number(this.vitalsForm.get('heightCm')?.value || 0);
    const weight = Number(this.vitalsForm.get('weightKg')?.value || 0);

    if (height > 0 && weight > 0) {
      const bmi = weight / ((height / 100) * (height / 100));

      this.vitalsForm.patchValue(
        {
          bmi: bmi.toFixed(1)
        },
        { emitEvent: false }
      );
    } else {
      this.vitalsForm.patchValue(
        {
          bmi: ''
        },
        { emitEvent: false }
      );
    }

    this.updateVitals();
  }

  getVitalStatus(type: string, value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') {
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

  updateVitals(): void {
    const form = this.vitalsForm.getRawValue();

    const vitals: VitalsModel = {
      heightCm: this.toNumberOrNull(form.heightCm),
      weightKg: this.toNumberOrNull(form.weightKg),
      bpSystolic: this.toNumberOrNull(form.bpSystolic),
      bpDiastolic: this.toNumberOrNull(form.bpDiastolic),
      pulseBpm: this.toNumberOrNull(form.pulseBpm),
      temperatureC: this.toNumberOrNull(form.temperatureC),
      respiratoryRate: this.toNumberOrNull(form.respiratoryRate),
      bmi: this.toNumberOrNull(form.bmi)
    };

    this.store.dispatch(VisitActions.setVitals({ vitals }));
  }

  private toNumberOrNull(value: string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const numericValue = Number(value);
    return Number.isNaN(numericValue) ? null : numericValue;
  }
}
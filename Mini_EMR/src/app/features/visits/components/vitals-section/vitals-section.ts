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

@Component({
  selector: 'app-vitals-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
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
    temperatureF: [''],
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

  updateVitals(): void {
    const form = this.vitalsForm.getRawValue();

    const vitals: VitalsModel = {
      heightCm: this.toNumberOrNull(form.heightCm),
      weightKg: this.toNumberOrNull(form.weightKg),
      bpSystolic: this.toNumberOrNull(form.bpSystolic),
      bpDiastolic: this.toNumberOrNull(form.bpDiastolic),
      pulseBpm: this.toNumberOrNull(form.pulseBpm),
      temperatureF: this.toNumberOrNull(form.temperatureF),
      respiratoryRate: this.toNumberOrNull(form.respiratoryRate)
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
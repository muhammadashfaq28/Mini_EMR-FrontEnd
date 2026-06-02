import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import * as VisitActions from '../../store/visit.actions';
import { VitalsModel } from '../../models/visit.model';

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
export class VitalsSection
{
  private fb = inject(FormBuilder);
  private store = inject(Store);

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

  calculateBMI(): void
  {
    const height = Number(this.vitalsForm.value.heightCm || 0);
    const weight = Number(this.vitalsForm.value.weightKg || 0);

    if (height > 0 && weight > 0)
    {
      const bmi = weight / ((height / 100) * (height / 100));

      this.vitalsForm.patchValue({
        bmi: bmi.toFixed(1)
      });
    }

    this.updateVitals();
  }

  updateVitals(): void
  {
    const form = this.vitalsForm.getRawValue();

    const vitals: VitalsModel =
    {
      heightCm: form.heightCm ? Number(form.heightCm) : undefined,
      weightKg: form.weightKg ? Number(form.weightKg) : undefined,
      bpSystolic: form.bpSystolic ? Number(form.bpSystolic) : undefined,
      bpDiastolic: form.bpDiastolic ? Number(form.bpDiastolic) : undefined,
      pulseBpm: form.pulseBpm ? Number(form.pulseBpm) : undefined,
      temperatureC: form.temperatureC ? Number(form.temperatureC) : undefined,
      respiratoryRate: form.respiratoryRate ? Number(form.respiratoryRate) : undefined,
      bmi: form.bmi ? Number(form.bmi) : undefined
    };

    this.store.dispatch(
      VisitActions.setVitals({ vitals })
    );
  }
}
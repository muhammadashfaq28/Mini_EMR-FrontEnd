import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vitals-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './vitals-section.html',
  styleUrl: './vitals-section.css'
})
export class VitalsSection {

  // Injections
  private fb = inject(FormBuilder);
  private store = inject(Store);

  // Form
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

  calculateBMI(): void {
    const height = Number(this.vitalsForm.value.heightCm);
    const weight = Number(this.vitalsForm.value.weightKg);
    if (height > 0 && weight > 0) {
      const bmi = weight / ((height / 100) * (height / 100));
      this.vitalsForm.patchValue({ bmi: bmi.toFixed(1) });
    }
  }
}
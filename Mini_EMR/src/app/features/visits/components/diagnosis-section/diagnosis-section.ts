import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as VisitActions from '../../store/visit.actions';

@Component({
  selector: 'app-diagnosis-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './diagnosis-section.html',
  styleUrl: './diagnosis-section.css'
})
export class DiagnosisSection {

  // Injections
  private fb = inject(FormBuilder);
  private store = inject(Store);

  // Form
  diagnosisForm = this.fb.group({
    chiefComplaint: ['', Validators.required],
    diagnosis: ['', Validators.required],
    clinicalNotes: ['']
  });

  updateDiagnosis(): void {
    this.store.dispatch(VisitActions.setDiagnosis({
      diagnosis: this.diagnosisForm.value.diagnosis || ''
    }));
    this.store.dispatch(VisitActions.setNotes({
      notes: this.diagnosisForm.value.clinicalNotes || ''
    }));
  }
}
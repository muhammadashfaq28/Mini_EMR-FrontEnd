import { CommonModule } from '@angular/common';
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import * as VisitActions from '../../store/visit.actions';

@Component({
  selector: 'app-diagnosis-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './diagnosis-section.html',
  styleUrl: './diagnosis-section.css'
})
export class DiagnosisSection implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  diagnosisForm = this.fb.group({
    chiefComplaint: ['', Validators.required],
    diagnosis: ['', Validators.required],
    clinicalNotes: ['', Validators.required]
  });

  ngOnInit(): void {
    this.diagnosisForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateDiagnosis());

    this.updateDiagnosis();
  }

  updateDiagnosis(): void {
    const form = this.diagnosisForm.getRawValue();

    this.store.dispatch(
      VisitActions.setChiefComplaint({
        chiefComplaint: form.chiefComplaint ?? ''
      })
    );

    this.store.dispatch(
      VisitActions.setDiagnosis({
        diagnosis: form.diagnosis ?? ''
      })
    );

    this.store.dispatch(
      VisitActions.setNotes({
        notes: form.clinicalNotes ?? ''
      })
    );
  }
}
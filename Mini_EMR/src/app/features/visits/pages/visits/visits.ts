import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { DiagnosisSection } from '../../components/diagnosis-section/diagnosis-section';
import { PrescriptionSection } from '../../components/prescription-section/prescription-section';
import { VitalsSection } from '../../components/vitals-section/vitals-section';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

import * as VisitActions from '../../store/visit.actions';
import {
  selectChiefComplaint,
  selectDiagnosis,
  selectError,
  selectLoading,
  selectNotes,
  selectPrescriptions,
  selectVitals
} from '../../store/visit.selectors';
import { AppState } from '../../../../shared/models/app-state.model';
import { SaveVisitRequestModel, VitalsModel } from '../../../../shared/models/visit.model';

@Component({
  selector: 'app-visits',
  standalone: true,
  imports: [
    CommonModule,
    VitalsSection,
    DiagnosisSection,
    PrescriptionSection,
    MatButtonModule,
    MatStepperModule
  ],
  templateUrl: './visits.html',
  styleUrl: './visits.css'
})
export class Visits implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading$ = this.store.select(selectLoading);
  readonly error$ = this.store.select(selectError);

  ngOnInit(): void {
    this.store.dispatch(VisitActions.resetVisit());
  }

  async saveVisit(): Promise<void> {
    const appointmentId = Number(this.route.snapshot.paramMap.get('appointmentId'));

    if (!appointmentId || Number.isNaN(appointmentId)) {
      return;
    }

    const [chiefComplaint, diagnosis, notes, vitals, prescriptions] = await Promise.all([
      firstValueFrom(this.store.select(selectChiefComplaint)),
      firstValueFrom(this.store.select(selectDiagnosis)),
      firstValueFrom(this.store.select(selectNotes)),
      firstValueFrom(this.store.select(selectVitals)),
      firstValueFrom(this.store.select(selectPrescriptions))
    ]);

    const safeVitals: VitalsModel = vitals ?? {
      heightCm: null,
      weightKg: null,
      bpSystolic: null,
      bpDiastolic: null,
      pulseBpm: null,
      temperatureF: null,
      respiratoryRate: null
    };

    const request: SaveVisitRequestModel = {
      appointmentId,
      vitals: safeVitals,
      chiefComplaint,
      visitNote: notes,
      diagnosis,
      prescriptions
    };

    this.store.dispatch(VisitActions.saveVisit({ request }));
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
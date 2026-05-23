import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  VisitState
} from './visit.state';

export const selectVisitState =
  createFeatureSelector<VisitState>(
    'visit'
  );

export const selectPatient =
  createSelector(
    selectVisitState,
    state => state.patient
  );

export const selectPrescriptions =
  createSelector(
    selectVisitState,
    state => state.prescriptions
  );
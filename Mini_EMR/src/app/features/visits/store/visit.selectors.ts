import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VisitState } from './visit.state';

export const selectVisitState =
    createFeatureSelector<VisitState>('visit');

export const selectPatient =
    createSelector(selectVisitState, state => state.patient);

export const selectChiefComplaint =
    createSelector(selectVisitState, state => state.chiefComplaint);

export const selectDiagnosis =
    createSelector(selectVisitState, state => state.diagnosis);

export const selectNotes =
    createSelector(selectVisitState, state => state.notes);

export const selectVitals =
    createSelector(selectVisitState, state => state.vitals);

export const selectPrescriptions =
    createSelector(selectVisitState, state => state.prescriptions);
    
export const selectLoading = createSelector(
    selectVisitState,
    state => state.loading
);

export const selectError = createSelector(
    selectVisitState,
    state => state.error
);
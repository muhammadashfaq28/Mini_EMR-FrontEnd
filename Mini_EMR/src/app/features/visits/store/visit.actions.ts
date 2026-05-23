import { createAction, props } from '@ngrx/store';

export const setPatient =
  createAction(
    '[Visit] Set Patient',
    props<{ patient: any }>()
  );

export const setDiagnosis =
  createAction(
    '[Visit] Set Diagnosis',
    props<{ diagnosis: string }>()
  );

export const setNotes =
  createAction(
    '[Visit] Set Notes',
    props<{ notes: string }>()
  );

export const addPrescription =
  createAction(
    '[Visit] Add Prescription',
    props<{ prescription: any }>()
  );

export const removePrescription =
  createAction(
    '[Visit] Remove Prescription',
    props<{ index: number }>()
  );
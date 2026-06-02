import { createAction, props } from '@ngrx/store';
import {
  PrescriptionRequestModel,
  SaveVisitRequestModel,
  VitalsModel
} from '../../../shared/models/visit.model';
import { PatientModel } from '../../../shared/models/patient.model';

export const setPatient = createAction(
  '[Visit] Set Patient',
  props<{ patient: PatientModel | null }>()
);

export const setChiefComplaint = createAction(
  '[Visit] Set Chief Complaint',
  props<{ chiefComplaint: string }>()
);

export const setDiagnosis = createAction(
  '[Visit] Set Diagnosis',
  props<{ diagnosis: string }>()
);

export const setNotes = createAction(
  '[Visit] Set Notes',
  props<{ notes: string }>()
);

export const addPrescription = createAction(
  '[Visit] Add Prescription',
  props<{ prescription: PrescriptionRequestModel }>()
);

export const removePrescription = createAction(
  '[Visit] Remove Prescription',
  props<{ index: number }>()
);

export const setVitals = createAction(
  '[Visit] Set Vitals',
  props<{ vitals: VitalsModel }>()
);

export const setPrescriptions = createAction(
  '[Visit] Set Prescriptions',
  props<{ prescriptions: PrescriptionRequestModel[] }>()
);

export const saveVisit = createAction(
  '[Visit] Save Visit',
  props<{ request: SaveVisitRequestModel }>()
);

export const saveVisitSuccess = createAction(
  '[Visit] Save Visit Success'
);

export const saveVisitFailure = createAction(
  '[Visit] Save Visit Failure',
  props<{ error: string }>()
);

export const resetVisit = createAction(
  '[Visit] Reset Visit'
);
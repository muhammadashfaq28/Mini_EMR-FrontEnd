import { createAction, props } from '@ngrx/store';
import { PrescriptionModel, VitalsModel } from '../models/visit.model';

export const setPatient = createAction(
    '[Visit] Set Patient',
    props<{ patient: unknown }>()
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
    props<{ prescription: PrescriptionModel }>()
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
    props<{ prescriptions: PrescriptionModel[] }>()
);

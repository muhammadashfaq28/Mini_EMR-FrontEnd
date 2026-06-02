import { createReducer, on } from '@ngrx/store';

import { initialVisitState } from './visit.state';
import * as VisitActions from './visit.actions';

export const visitReducer = createReducer(
    initialVisitState,

    on(VisitActions.setPatient, (state, action) => ({
        ...state,
        patient: action.patient
    })),

    on(VisitActions.setChiefComplaint, (state, action) => ({
        ...state,
        chiefComplaint: action.chiefComplaint
    })),

    on(VisitActions.setDiagnosis, (state, action) => ({
        ...state,
        diagnosis: action.diagnosis
    })),

    on(VisitActions.setNotes, (state, action) => ({
        ...state,
        notes: action.notes
    })),

    on(VisitActions.addPrescription, (state, action) => ({
        ...state,
        prescriptions: [...state.prescriptions, action.prescription]
    })),

    on(VisitActions.removePrescription, (state, action) => ({
        ...state,
        prescriptions: state.prescriptions.filter((_, i) => i !== action.index)
    })),
    on(VisitActions.setVitals, (state, action) => ({
        ...state,
        vitals: action.vitals
    })),
    on(VisitActions.setPrescriptions, (state, action) => ({
        ...state,
        prescriptions: action.prescriptions
    })),
);
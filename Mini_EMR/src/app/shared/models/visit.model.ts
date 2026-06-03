export interface VisitDraftModel {
    appointmentId: number;
    patientId: number;
    doctorId: number;
    vitals: VitalsModel;
    clinicalNotes: ClinicalNotesModel;
    prescriptions: PrescriptionRequestModel[];
}

export interface VitalsModel {
    heightCm?: number | null;
    weightKg?: number | null;
    bpSystolic?: number | null;
    bpDiastolic?: number | null;
    pulseBpm?: number | null;
    temperatureC?: number | null;
    temperatureF?: number | null; // for response display only, not stored in backend
    respiratoryRate?: number | null;
    bmi?: number | null;
}

export interface ClinicalNotesModel {
    chiefComplaint: string;
    visitNote: string;
    diagnosis: string;
}

export interface PrescriptionRequestModel {
    medicineId: number;
    dosage: string;
    frequency: PrescriptionFrequency;
    duration: string;
    instructions?: string | null;
}

export interface SaveVisitRequestModel {
    appointmentId: number;
    chiefComplaint: string;
    visitNote: string;
    diagnosis: string;

    heightCm?: number | null;
    weightKg?: number | null;
    bpSystolic?: number | null;
    bpDiastolic?: number | null;
    pulseBpm?: number | null;
    temperatureC?: number | null;
    respiratoryRate?: number | null;
    bmi?: number | null;

    prescriptions: PrescriptionRequestModel[];
}

export interface VisitHistoryModel {
    id: number;
    visitDate: string;
    doctorName: string;
    chiefComplaint: string;
    visitNote: string;
    diagnosis: string;
    vitals: VitalsModel;
    prescriptions: PrescriptionHistoryModel[];
}

export interface PrescriptionHistoryModel {
    id: number;
    medicineId: number;
    medicineName: string;
    strength: string;
    dosage: string;
    frequency: string;
    durationDays: number;
    instructions?: string | null;
}

export type PrescriptionFrequency =
    | 'Once daily'
    | 'Twice daily'
    | 'Thrice daily'
    | 'Four times daily'
    | 'As needed';
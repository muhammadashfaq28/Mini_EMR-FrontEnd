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
    temperatureF?: number | null;
    respiratoryRate?: number | null;
    BMI?: number | null;
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
    vitals: VitalsModel;
    chiefComplaint: string;
    visitNote: string;
    diagnosis: string;
    prescriptions: PrescriptionRequestModel[];
}

export interface VisitHistoryModel {
    id: number;
    visitDate: string;
    doctorName: string;
    vitals: VitalsModel;
    chiefComplaint: string;
    visitNote: string;
    diagnosis: string;
    prescriptions: PrescriptionHistoryModel[];
}

export interface PrescriptionHistoryModel {
    medicineName: string;
    genericName: string;
    strength: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string | null;
}

export type PrescriptionFrequency =
    | 'Once daily'
    | 'Twice daily'
    | 'Thrice daily'
    | 'Four times daily'
    | 'As needed';

export interface VitalsModel
{
  heightCm?: number;
  weightKg?: number;
  bpSystolic?: number;
  bpDiastolic?: number;
  pulseBpm?: number;
  temperatureC?: number;
  respiratoryRate?: number;
  bmi?: number;
}

export interface PrescriptionModel
{
  medicineId: number;
  dosage: string;
  frequency: string;
  durationDays: number;
  instructions?: string;
}

export interface VisitModel
{
  appointmentId: number;

  chiefComplaint: string;

  diagnosis: string;

  visitNote: string;

  vitals: VitalsModel;

  prescriptions: PrescriptionModel[];
}
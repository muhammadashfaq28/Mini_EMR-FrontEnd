import { PrescriptionModel, VitalsModel } from '../models/visit.model';

export interface VisitState
{
  patient: unknown | null;
  chiefComplaint: string;
  diagnosis: string;
  notes: string;
  vitals: VitalsModel | null;
  prescriptions: PrescriptionModel[];
  loading: boolean;
  error: string | null;
}

export const initialVisitState: VisitState =
{
  patient: null,
  chiefComplaint: '',
  diagnosis: '',
  notes: '',
  vitals: null,
  prescriptions: [],
  loading: false,
  error: null
};
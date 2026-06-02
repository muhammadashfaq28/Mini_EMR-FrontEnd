import { PrescriptionRequestModel, VitalsModel } from '../../../shared/models/visit.model';
import { PatientModel } from '../../../shared/models/patient.model';


export interface VisitState {
  patient: PatientModel | null;
  chiefComplaint: string;
  diagnosis: string;
  notes: string;
  vitals: VitalsModel | null;
  prescriptions: PrescriptionRequestModel[];
  loading: boolean;
  error: string | null;
}

export const initialVisitState: VisitState = {
  patient: null,
  chiefComplaint: '',
  diagnosis: '',
  notes: '',
  vitals: null,
  prescriptions: [],
  loading: false,
  error: null
};
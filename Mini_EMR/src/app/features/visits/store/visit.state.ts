export interface VisitState
{
  patient: any | null;

  vitals: any | null;

  diagnosis: string;

  notes: string;

  prescriptions: any[];

  loading: boolean;

  error: string | null;
}

export const initialVisitState:
VisitState =
{
  patient: null,

  vitals: null,

  diagnosis: '',

  notes: '',

  prescriptions: [],

  loading: false,

  error: null
};
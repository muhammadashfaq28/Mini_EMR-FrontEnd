export interface Patient {
  id?: number;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  cnic: string | null;
  phoneNumber: string | null;
  bloodGroup: string | null;
  address: string | null;
}

export interface PatientListResponse {
  patients: Patient[];
}
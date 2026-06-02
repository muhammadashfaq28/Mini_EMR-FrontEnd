export interface PatientModel {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;
  phoneNumber: string;
  cnic?: string | null;
  bloodGroup?: string | null;
  address?: string | null;
  lastVisitDate?: string | null;
}

export interface CreatePatientRequestModel {
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;
  phoneNumber: string;
  cnic?: string | null;
  bloodGroup?: string | null;
  address?: string | null;
}

export interface UpdatePatientRequestModel extends CreatePatientRequestModel {
  id: number;
}

export type Gender = 'Male' | 'Female' | 'Other';
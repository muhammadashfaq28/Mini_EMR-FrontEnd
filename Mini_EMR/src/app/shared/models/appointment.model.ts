export interface AppointmentModel {
  id: number;
  patientId: number;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: number;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  notes?: string | null;
}

export interface BookAppointmentRequestModel {
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string | null;
}

export interface DashboardSummaryModel {
  totalAppointments: number;
  booked: number;
  checkedIn: number;
  completed: number;
}

export type AppointmentStatus =
  | 'Booked'
  | 'CheckedIn'
  | 'Completed'
  | 'Cancelled';
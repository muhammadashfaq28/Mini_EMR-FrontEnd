export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  appointmentDateTime: string;
  notes: string;
  status: 'Booked' | 'CheckedIn' | 'Cancelled';
}

export interface StatusCounts {
  booked: number;
  checkedIn: number;
  cancelled: number;
}

export interface BookAppointmentRequest {
  patientId: number;
  doctorId: number;
  appointmentDateTime: string;
  notes: string | null | undefined;
}
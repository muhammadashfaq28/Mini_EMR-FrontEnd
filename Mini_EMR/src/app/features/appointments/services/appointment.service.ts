import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { PatientModel } from '../../../shared/models/patient.model';
import { UserModel } from '../../../shared/models/user.model';

export interface BookAppointmentRequestModel {
  patientId: number;
  doctorId: number;
  appointmentDateTime: string;
  notes?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/appointments`;
  private readonly authUrl = `${environment.apiUrl}/auth`;
  private readonly patientsUrl = `${environment.apiUrl}/patient`;

  getPatients(): Observable<{ patients: PatientModel[] }> {
    return this.http.get<{ patients: PatientModel[] }>(this.patientsUrl);
  }

  getDoctors(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.authUrl}/doctors`);
  }

  bookAppointment(model: BookAppointmentRequestModel): Observable<void> {
    return this.http.post<void>(this.apiUrl, model);
  }
}
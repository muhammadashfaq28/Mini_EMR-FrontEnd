import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type AppointmentStatus = 'Booked' | 'CheckedIn' | 'Completed' | 'Cancelled';

export interface DashboardAppointmentModel {
  id: number;
  patientId: number;
  patientName: string;
  age: number;
  gender: string;
  doctorName: string;
  appointmentDateTime: string;
  status: AppointmentStatus;
}

export interface DashboardStatusCountsModel {
  total: number;
  booked: number;
  checkedIn: number;
  completed: number;
}

export interface DoctorAppointmentModel {
  id: number;
  patientName: string;
  appointmentDateTime: string;
  status: AppointmentStatus;
}

export interface BookAppointmentRequestModel {
  patientId: number;
  doctorId: number;
  appointmentDateTime: string;
  notes?: string | null;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAppointments(date: string, status: string): Observable<DashboardAppointmentModel[]> {
    let params = new HttpParams().set('date', date);

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<DashboardAppointmentModel[]>(`${this.apiUrl}/appointments`, { params });
  }

  getStatusCounts(date: string): Observable<DashboardStatusCountsModel> {
    const params = new HttpParams().set('date', date);
    return this.http.get<DashboardStatusCountsModel>(`${this.apiUrl}/appointments/status-counts`, { params });
  }

  getDoctorTodayAppointments(): Observable<DoctorAppointmentModel[]> {
    return this.http.get<DoctorAppointmentModel[]>(`${this.apiUrl}/appointments/doctor/today`);
  }

  bookAppointment(model: BookAppointmentRequestModel): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/appointments`, model);
  }

  checkInAppointment(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/appointments/${id}/checkin`, {});
  }

  cancelAppointment(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/appointments/${id}/cancel`, {});
  }
}
import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

// dashboard.service.ts - Complete

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAppointments(date: string, status: string): Observable<any[]> {
    let params = new HttpParams().set('date', date);
    if (status) params = params.set('status', status);
    return this.http.get<any[]>(`${this.apiUrl}/appointments`, { params });
  }

  getStatusCounts(date: string): Observable<any> {
    const params = new HttpParams().set('date', date);
    return this.http.get(`${this.apiUrl}/appointments/status-counts`, { params });
  }

  getDoctorTodayAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments/doctor/today`);
  }

  checkInAppointment(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/appointments/${id}/checkin`, {});
  }

  cancelAppointment(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/appointments/${id}/cancel`, {});
  }
}


  



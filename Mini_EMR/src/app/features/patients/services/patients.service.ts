import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Patient, PatientListResponse } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService
{
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/patient`;

  getPatients(): Observable<PatientListResponse>
  {
    return this.http.get<PatientListResponse>(this.apiUrl);
  }

  getPatientById(id: number): Observable<Patient>
  {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  createPatient(model: Patient): Observable<Patient>
  {
    return this.http.post<Patient>(this.apiUrl, model);
  }

  updatePatient(id: number, model: Patient): Observable<Patient>
  {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, model);
  }
}
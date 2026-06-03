import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreatePatientRequestModel,
  PatientModel,
  UpdatePatientRequestModel
} from '../../../shared/models/patient.model';
import { VisitHistoryModel } from '../../../shared/models/visit.model';

interface PatientsResponseModel {
  patients: PatientModel[];
}

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/patient`;

  getPatients(): Observable<PatientsResponseModel> {
    return this.http.get<PatientsResponseModel>(this.apiUrl);
  }

  getPatientById(id: number): Observable<PatientModel> {
    return this.http.get<PatientModel>(`${this.apiUrl}/${id}`);
  }

  createPatient(model: CreatePatientRequestModel): Observable<PatientModel> {
    return this.http.post<PatientModel>(this.apiUrl, model);
  }

  updatePatient(id: number, model: UpdatePatientRequestModel): Observable<PatientModel> {
    return this.http.put<PatientModel>(`${this.apiUrl}/${id}`, model);
  }

  getPatientVisits(id: number): Observable<VisitHistoryModel[]> {
    return this.http.get<VisitHistoryModel[]>(`${this.apiUrl}/${id}/visits`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService
{
  private http = inject(HttpClient);

  private apiUrl =`${environment.apiUrl}/patient`;

  getPatients(): Observable<any[]>
  {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPatientById(id: number)
  {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPatient(model: any)
  {
    return this.http.post(this.apiUrl,model);
  }

  updatePatient(id: number,model: any)
  {
    return this.http.put(`${this.apiUrl}/${id}`,model);
  }
}
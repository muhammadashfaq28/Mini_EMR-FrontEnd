import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MedicineModel } from '../../../shared/models/medicine.model';

@Injectable({ providedIn: 'root' })
export class MedicinesService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/medicines`;

  getMedicines(): Observable<MedicineModel[]> {
    return this.http.get<MedicineModel[]>(this.apiUrl);
  }
}
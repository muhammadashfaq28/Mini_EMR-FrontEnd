import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Medicine } from '../models/medicine.model';

@Injectable({ providedIn: 'root' })
export class MedicinesService {

  // Injections
  private http = inject(HttpClient);

  // API
  private apiUrl = `${environment.apiUrl}/medicines`;

  getMedicines() {
    return this.http.get<Medicine[]>(this.apiUrl);
  }
}
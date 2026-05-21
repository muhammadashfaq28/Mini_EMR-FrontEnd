import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private apiUrl =
    `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
  }

  login(model: any) {
    return this.http.post(`${this.apiUrl}/login`, model);
  }
  getDoctors() {
    return this.http.get(`${this.apiUrl}/doctors`);
  }
}
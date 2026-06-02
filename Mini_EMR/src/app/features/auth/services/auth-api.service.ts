import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginRequestModel, LoginResponseModel } from '../../../shared/models/auth.model';
import { UserModel } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private readonly http: HttpClient) {}

  login(model: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/login`, model);
  }

  getDoctors(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/doctors`);
  }
}
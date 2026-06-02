import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SaveVisitRequestModel } from '../../../shared/models/visit.model';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/visits`;

  saveVisit(request: SaveVisitRequestModel): Observable<void> {
    return this.http.post<void>(this.apiUrl, request);
  }
}
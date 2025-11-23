import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summary } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private apiUrl = `${environment.apiUrl}/summary`;

  constructor(private http: HttpClient) {}

  getCustomerSummary(customerId: number): Observable<Summary> {
    return this.http.get<Summary>(`${this.apiUrl}/customer/${customerId}`);
  }
}

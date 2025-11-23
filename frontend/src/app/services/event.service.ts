import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getEventsByCustomerId(customerId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  getRecentEvents(customerId: number, days: number = 30): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/customer/${customerId}/recent?days=${days}`);
  }
}

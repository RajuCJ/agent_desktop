import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, CustomerJourney } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  getCustomerByCustomerId(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customer-id/${customerId}`);
  }

  getCustomerJourney(id: number): Observable<CustomerJourney> {
    return this.http.get<CustomerJourney>(`${this.apiUrl}/${id}/journey`);
  }
}

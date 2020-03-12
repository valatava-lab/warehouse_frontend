import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  api = environment.apiUrl + '/customers';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.api);
  }

  save(customer: Customer): Observable<void> {
    return this.httpClient.post<void>(this.api, customer);
  }

  update(customer: Customer): Observable<void> {
    return this.httpClient.put<void>(this.api, customer);
  }
}

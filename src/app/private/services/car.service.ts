import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  api = environment.apiUrl + '/cars';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.api);
  }

  save(car: Car): Observable<void> {
    return this.httpClient.post<void>(this.api, car);
  }

  update(car: Car): Observable<void> {
    return this.httpClient.put<void>(this.api, car);
  }
}

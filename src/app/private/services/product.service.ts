import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = environment.apiUrl + '/stores';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.api);
  }

  save(product: Product): Observable<void> {
    return this.httpClient.post<void>(this.api, product);
  }

  update(product: Product): Observable<void> {
    return this.httpClient.put<void>(this.api, product);
  }
}

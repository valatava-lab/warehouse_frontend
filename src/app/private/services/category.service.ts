import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api = environment.apiUrl + '/categories';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.api);
  }

  save(category: Category): Observable<void> {
    return this.httpClient.post<void>(this.api, category);
  }

  update(category: Category): Observable<void> {
    return this.httpClient.put<void>(this.api, category);
  }
}

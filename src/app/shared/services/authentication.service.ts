import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private accessTokenSubject: BehaviorSubject<string>;
  private accessToken: Observable<string>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.accessTokenSubject = new BehaviorSubject<string>(localStorage.getItem('accessToken'));
    this.accessToken = this.accessTokenSubject.asObservable();
  }

  public get accessTokenValue(): string {
    return this.accessTokenSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, { username, password })
      .pipe(map(accessToken => {
        // store accessToken details and jwt token in local storage to keep accessToken logged in between page refreshes
        localStorage.setItem('accessToken', accessToken.id_token);
        this.accessTokenSubject.next(accessToken.id_token);
        return accessToken.id_token;
      }));
  }

  logout() {
    // remove accessToken from local storage to log user out
    localStorage.removeItem('accessToken');
    this.accessTokenSubject.next(null);
    this.router.navigate(['login']);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  constructor(private http: HttpClient, private apiService: ApiService) { }

  login(username: string, password: string) {
    return this.apiService.post<any>('login', { username, password })
      .pipe(
        tap((response) => {
          this.token = response.token;
          localStorage.setItem('token', this.token);
        })
      );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token') || '';
    }
    return this.token;
  }
}

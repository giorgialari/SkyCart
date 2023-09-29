import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BSubject = new BehaviorSubject<any[]>([]);
  currentBSubject = this.BSubject.asObservable();
  next(data: any) {
    this.BSubject.next(data);
  }

  constructor(private http: HttpClient) {}
  get<T = any>(apiController: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${apiController}`);
  }

  post<T = any>(apiController: string, data: T): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/${apiController}`, data);
  }

  put<T = any>(apiController: string, data: T): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/${apiController}`, data);
  }

  delete<T = any>(apiController: string, id: string | number): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/${apiController}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Schedule {
  id?: number;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  note?: string;
}

export interface CreateScheduleRequest {
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  note?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = 'https://sneaker-api-production-bbed.up.railway.app/schedules';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  create(request: CreateScheduleRequest): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, request, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
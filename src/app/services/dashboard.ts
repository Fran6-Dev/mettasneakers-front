import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface DashboardData {
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  totalSales: number;
  totalProducts: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}`});
  }

  getDashboard(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.apiUrl, { headers: this.getHeaders() });
  }
}

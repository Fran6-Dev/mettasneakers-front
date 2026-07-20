import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Expense {
  id?: number;
  description: string;
  amount: number;
  category: string;
  expenseDate?: string;
}

export interface CreateExpenseRequest {
  description: string;
  amount: number;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  private apiUrl = `${environment.apiUrl}/expenses`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}`});
  }

  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  create(request: CreateExpenseRequest): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, request, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

}

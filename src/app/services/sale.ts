import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sale {
  id?: number;
  productId?: number;
  productName?: string;
  productBrand?: string;
  quantity: number;
  totalPrice?: number;
  saleDate?: string;
}

export interface CreateSaleRequest {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class SaleService {

  private apiUrl = 'http://localhost:8080/sales';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}`});
  }

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  create(request: CreateSaleRequest): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, request, { headers: this.getHeaders()});
  }
}

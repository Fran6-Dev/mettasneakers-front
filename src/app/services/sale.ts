import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Sale {
  id?: number;
  productId?: number;
  productName?: string;
  productBrand?: string;
  quantity: number;
  productSize: string;
  promotion: number;
  totalPrice?: number;
  saleDate?: string;
}

export interface CreateSaleRequest {
  productId: number;
  quantity: number;
  promotion: number;
}

@Injectable({
  providedIn: 'root',
})
export class SaleService {

  private apiUrl = `${environment.apiUrl}/sales`;

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

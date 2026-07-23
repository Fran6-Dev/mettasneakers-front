import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Product {
  id?: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  size: string;
  stock: number;
  description?: string;
}


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAll(category?: string, brand?: string): Observable<Product[]> {
    let url = this.apiUrl;
    const params = [];
    if (category) params.push(`category=${category}`);
    if (brand) params.push(`brand=${brand}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    return this.http.get<Product[]>(url, { headers: this.getHeaders() });
}

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers: this.getHeaders()});
  }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/brands`, { headers: this.getHeaders() });
}

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.getHeaders()});
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers: this.getHeaders()});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders()});
  }
}

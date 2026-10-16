import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../../product/models/product.model';
import { normalizeProduct } from '../../product/services/product.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = `${environment.apiUrl}/categories`;
  private readonly productsUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  getProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/category/${id}`).pipe(
      map(products => products.map(normalizeProduct))
    );
  }
}

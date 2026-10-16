import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  active?: boolean;
  category?: Product['category'];
  categoryId?: number | null;
  categoryName?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export function normalizeProduct(product: ProductResponse): Product {
  const category = product.category ?? (
    product.categoryId !== null && product.categoryId !== undefined
      ? {
          id: product.categoryId,
          name: product.categoryName || 'Uncategorised'
        }
      : null
  );

  return {
    ...product,
    active: product.active ?? true,
    category
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<ProductResponse[]>(this.apiUrl).pipe(
      map(products => products.map(normalizeProduct))
    );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`).pipe(
      map(normalizeProduct)
    );
  }

  search(keyword: string): Observable<Product[]> {
    const params = new HttpParams().set('keyword', keyword);

    return this.http.get<ProductResponse[]>(`${this.apiUrl}/search`, { params }).pipe(
      map(products => products.map(normalizeProduct))
    );
  }
}

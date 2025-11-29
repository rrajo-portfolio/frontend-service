import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import {
  Product,
  ProductPayload,
  ProductStatus
} from '../../../shared/models/product.model';
import { PageResponse } from '../../../shared/models/page.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly baseEndpoint = '/catalog/products';

  constructor(private readonly api: ApiService) {}

  getProducts(): Observable<Product[]> {
    return this.api
      .get<PageResponse<Product>>(this.baseEndpoint)
      .pipe(map((page) => this.ensureArray(page.content)));
  }

  searchProducts(term: string): Observable<Product[]> {
    const query = term ? `?q=${encodeURIComponent(term)}` : '';
    const normalized = term.trim().toLowerCase();
    return this.api
      .get<Product[]>(`${this.baseEndpoint}/search${query}`)
      .pipe(
        map((products) => this.ensureArray(products)),
        map((products) => {
          if (!normalized) {
            return products;
          }
          return products.filter((product) => {
            const fields = [
              product.name,
              product.description,
              ...(product.tags ?? [])
            ]
              .filter(Boolean)
              .map((value) => value!.toString().toLowerCase());
            return fields.some((field) => field.includes(normalized));
          });
        })
      );
  }

  getProduct(id: string): Observable<Product> {
    return this.api.get<Product>(`${this.baseEndpoint}/${id}`);
  }

  createProduct(payload: ProductPayload): Observable<Product> {
    return this.api.post<Product>(this.baseEndpoint, payload);
  }

  updateProduct(id: string, payload: ProductPayload): Observable<Product> {
    return this.api.put<Product>(`${this.baseEndpoint}/${id}`, payload);
  }

  updateAvailability(id: string, status: ProductStatus): Observable<Product> {
    return this.api.patch<Product>(`${this.baseEndpoint}/${id}/availability`, {
      status
    });
  }

  deleteProduct(id: string): Observable<void> {
    return this.api.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  private ensureArray<T>(items: T[] | T | undefined | null): T[] {
    return Array.isArray(items) ? items : [];
  }
}

import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Order } from '../../../shared/models/order.model';
import { PageResponse } from '../../../shared/models/page.model';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly baseEndpoint = '/api/orders';

  constructor(private readonly api: ApiService) {}

  getOrders(): Observable<Order[]> {
    return this.api
      .get<PageResponse<Order>>(this.baseEndpoint)
      .pipe(map((page) => this.ensureArray(page.content)));
  }

  getOrder(id: string): Observable<Order> {
    return this.api.get<Order>(`${this.baseEndpoint}/${id}`);
  }

  createOrder(payload: unknown): Observable<Order> {
    return this.api.post<Order>(this.baseEndpoint, payload);
  }

  private ensureArray<T>(items: T[] | T | undefined | null): T[] {
    return Array.isArray(items) ? items : [];
  }
}

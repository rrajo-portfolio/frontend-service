import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Order } from '../../../shared/models/order.model';
import { PageResponse } from '../../../shared/models/page.model';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly baseEndpoint = '/orders';

  constructor(
    private readonly api: ApiService,
    private readonly authService: AuthService
  ) {}

  getOrders(): Observable<Order[]> {
    if (this.authService.hasRole('admin') || this.authService.hasRole('portfolio_admin')) {
      return this.api
        .get<PageResponse<Order>>(this.baseEndpoint)
        .pipe(map((page) => this.ensureArray(page.content)));
    }

    return this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        return this.api.get<Order[]>(`${this.baseEndpoint}/user/${user.id}`);
      })
    );
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

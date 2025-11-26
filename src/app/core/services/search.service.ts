import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { CatalogService } from '../../features/catalog/services/catalog.service';
import { OrdersService } from '../../features/orders/services/orders.service';
import { UsersService } from '../../features/users/services/users.service';
import { Product } from '../../shared/models/product.model';
import { Order } from '../../shared/models/order.model';
import { User } from '../../shared/models/user.model';

export interface GlobalSearchResults {
  products: Product[];
  orders: Order[];
  users: User[];
}

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  search(term: string): Observable<GlobalSearchResults> {
    const normalized = (term ?? '').trim().toLowerCase();
    if (!normalized) {
      return this.getDefaultResults();
    }

    const users$ = this.authService.hasRole('admin')
      ? this.usersService.getUsers()
      : of([]);

    return combineLatest([
      this.catalogService.searchProducts(normalized),
      this.ordersService.getOrders(),
      users$
    ]).pipe(
      map(([products, orders, users]) => ({
        products: products.slice(0, 5),
        orders: this.filterOrders(orders, normalized).slice(0, 5),
        users: this.filterUsers(users, normalized).slice(0, 5)
      }))
    );
  }

  private getDefaultResults(): Observable<GlobalSearchResults> {
    const users$ = this.authService.hasRole('admin')
      ? this.usersService.getUsers()
      : of([]);

    return combineLatest([
      this.catalogService.getProducts(),
      this.ordersService.getOrders(),
      users$
    ]).pipe(
      map(([products, orders, users]) => ({
        products: products.slice(0, 5),
        orders: orders.slice(0, 5),
        users: users.slice(0, 5)
      }))
    );
  }

  private filterOrders(orders: Order[], term: string): Order[] {
    return orders.filter((order) => {
      const haystack = [order.id, order.status, order.userId]
        .filter(Boolean)
        .map((value) => value!.toString().toLowerCase())
        .join(' ');
      return haystack.includes(term);
    });
  }

  private filterUsers(users: User[], term: string): User[] {
    return users.filter((user) => {
      const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`;
      const haystack = [fullName, user.email, user.phone]
        .filter(Boolean)
        .map((value) => value!.toString().toLowerCase())
        .join(' ');
      return haystack.includes(term);
    });
  }
}

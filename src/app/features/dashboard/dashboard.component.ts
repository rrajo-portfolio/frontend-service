import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { CatalogService } from '../catalog/services/catalog.service';
import { OrdersService } from '../orders/services/orders.service';
import { UsersService } from '../users/services/users.service';
import { Product } from '../../shared/models/product.model';
import { Order } from '../../shared/models/order.model';
import { User } from '../../shared/models/user.model';

interface DashboardMetrics {
  products: number;
  users: number;
  pendingOrders: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  metrics$!: Observable<DashboardMetrics>;
  highlightedProducts$!: Observable<Product[]>;
  readonly endpoints = [
    {
      icon: 'Activity',
      labelKey: 'dashboard.endpoints.prometheus',
      description: 'http://localhost:9090/targets',
      link: 'http://localhost:9090/targets'
    },
    {
      icon: 'BarChart2',
      labelKey: 'dashboard.endpoints.grafana',
      description: 'http://localhost:3000/d/portfolio-overview',
      link: 'http://localhost:3000/d/portfolio-overview'
    },
    {
      icon: 'KeyRound',
      labelKey: 'dashboard.endpoints.keycloak',
      description: 'http://localhost:7080',
      link: 'http://localhost:7080'
    }
  ];

  constructor(
    private readonly catalogService: CatalogService,
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    const products$ = this.catalogService.getProducts().pipe(
      catchError(() => of([])),
      shareReplay(1)
    );
    const orders$ = this.ordersService.getOrders().pipe(
      catchError(() => of([])),
      shareReplay(1)
    );
    const users$ = this.usersService.getUsers().pipe(
      catchError(() => of([])),
      shareReplay(1)
    );

    this.metrics$ = combineLatest([products$, orders$, users$]).pipe(
      map(([products, orders, users]) => ({
        products: products.length,
        users: users.length,
        pendingOrders: orders.filter((o) => o.status === 'PENDING').length
      }))
    );

    this.highlightedProducts$ = products$.pipe(map((products) => products.slice(0, 3)));
  }
}

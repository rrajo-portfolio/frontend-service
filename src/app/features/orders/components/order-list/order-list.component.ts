import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../../../shared/models/order.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedOrders = new Set<string>();
  searchQuery = '';
  statusFilter = '';
  isAdmin = false;
  isStandardUser = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly ordersService: OrdersService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.hasAnyRole(['admin', 'portfolio_admin']);
    this.isStandardUser = this.authService.hasRole('user') && !this.isAdmin;
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe((orders) => {
        this.orders = orders;
        this.applyFilters();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleSearch(value: string): void {
    this.searchQuery = value;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  onStatusChange(value: string): void {
    this.statusFilter = value;
    this.applyFilters();
  }

  applyFilters(): void {
    const search = this.searchQuery.trim().toLowerCase();
    this.filteredOrders = this.orders.filter((order) => {
      const matchesStatus = this.statusFilter
        ? order.status === this.statusFilter
        : true;
      const haystack = [order.id, order.userId, order.userName, order.userEmail, order.status]
        .filter(Boolean)
        .map((value) => value!.toString().toLowerCase())
        .join(' ');
      const matchesQuery = haystack.includes(search);
      return matchesStatus && matchesQuery;
    });
  }

  toggleSelect(orderId: string): void {
    if (this.selectedOrders.has(orderId)) {
      this.selectedOrders.delete(orderId);
    } else {
      this.selectedOrders.add(orderId);
    }
  }

  toggleSelectAll(): void {
    if (this.selectedOrders.size === this.filteredOrders.length) {
      this.selectedOrders.clear();
      return;
    }
    this.filteredOrders.forEach((order) => this.selectedOrders.add(order.id));
  }

  isSelected(orderId: string): boolean {
    return this.selectedOrders.has(orderId);
  }

  bulkClear(): void {
    this.selectedOrders.clear();
  }
}

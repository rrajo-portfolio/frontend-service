import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../orders/services/orders.service';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { CartItem } from '../../shared/models/cart-item.model';
import { AccountUser } from '../../shared/models/account-user.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  user?: AccountUser;
  isSubmitting = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly cartService: CartService,
    private readonly ordersService: OrdersService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get items$() {
    return this.cartService.items$;
  }

  ngOnInit(): void {
    this.authService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  remove(productId: string): void {
    this.cartService.remove(productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (!Number.isFinite(quantity) || quantity < 1) {
      return;
    }
    this.cartService.updateQuantity(productId, Math.floor(quantity));
  }

  checkout(items: CartItem[]): void {
    if (!items.length || this.isSubmitting) {
      return;
    }
    if (!this.user) {
      this.notificationService.error('No se pudo identificar al usuario actual.');
      return;
    }
    const currency = this.getCurrency(items);
    const payload = {
      userId: this.user.id,
      currency,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
    this.isSubmitting = true;
    this.ordersService.createOrder(payload).subscribe({
      next: (order) => {
        this.notificationService.success('Pedido creado correctamente.');
        this.cartService.clear();
        this.isSubmitting = false;
        this.router.navigate(['/orders', order.id]);
      },
      error: () => {
        this.isSubmitting = false;
        this.notificationService.error('No se pudo procesar el pago. Inténtalo nuevamente.');
      }
    });
  }

  getTotal(items: CartItem[]): number {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  getCurrency(items: CartItem[]): string {
    return items[0]?.currency ?? 'USD';
  }
}

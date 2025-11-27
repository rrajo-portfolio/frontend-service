import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../orders/services/orders.service';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { CartItem } from '../../shared/models/cart-item.model';
import { AccountUser } from '../../shared/models/account-user.model';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  user?: AccountUser;
  isSubmitting = false;
  readonly defaultCurrency = 'EUR';
  private readonly vatRate = 0.21;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly cartService: CartService,
    private readonly ordersService: OrdersService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly translationService: TranslationService
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

  updateQuantity(productId: string, quantity: number | string): void {
    const parsed = Math.floor(Number(quantity) || 1);
    const safeValue = Math.max(1, parsed);
    this.cartService.updateQuantity(productId, safeValue);
  }

  stepQuantity(productId: string, delta: number, current: number): void {
    const nextValue = Math.max(1, current + delta);
    this.updateQuantity(productId, nextValue);
  }

  checkout(items: CartItem[]): void {
    if (!items.length || this.isSubmitting) {
      return;
    }
    if (!this.user) {
      this.notificationService.error(
        this.translationService.translate('cart.toast.missingUser')
      );
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
        this.notificationService.success(
          this.translationService.translate('cart.toast.success')
        );
        this.cartService.clear();
        this.isSubmitting = false;
        this.router.navigate(['/orders', order.id]);
      },
      error: () => {
        this.isSubmitting = false;
        this.notificationService.error(
          this.translationService.translate('cart.toast.error')
        );
      }
    });
  }

  getItemCount(items: CartItem[]): number {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getSubtotal(items: CartItem[]): number {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  getTaxes(items: CartItem[]): number {
    return this.roundCurrency(this.getSubtotal(items) * this.vatRate);
  }

  getGrandTotal(items: CartItem[]): number {
    return this.roundCurrency(this.getSubtotal(items) + this.getTaxes(items));
  }

  getCurrency(items: CartItem[]): string {
    return items[0]?.currency ?? this.defaultCurrency;
  }

  private roundCurrency(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}

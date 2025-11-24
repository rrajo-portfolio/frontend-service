import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../shared/models/cart-item.model';
import { Product } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'portfolio.cart';
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.load());
  readonly items$ = this.itemsSubject.asObservable();

  addProduct(product: Product): void {
    const items = [...this.itemsSubject.value];
    const existing = items.find((item) => item.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        currency: product.currency ?? 'EUR',
        quantity: 1
      });
    }
    this.persist(items);
  }

  updateQuantity(productId: string, quantity: number): void {
    const items = this.itemsSubject.value.map((item) =>
      item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    this.persist(items);
  }

  remove(productId: string): void {
    const items = this.itemsSubject.value.filter((item) => item.productId !== productId);
    this.persist(items);
  }

  clear(): void {
    this.persist([]);
  }

  getSnapshot(): CartItem[] {
    return this.itemsSubject.value;
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  private persist(items: CartItem[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { CatalogService } from '../../../catalog/services/catalog.service';
import { Product } from '../../../../shared/models/product.model';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup;
  products$!: Observable<Product[]>;
  private products: Product[] = [];
  users: User[] = [];
  matchedUserEmail = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly ordersService: OrdersService,
    private readonly catalogService: CatalogService,
    private readonly usersService: UsersService,
    public readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      userId: ['', Validators.required],
      items: this.fb.array([this.buildItem()])
    });
    this.products$ = of([]);

    this.catalogService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
        this.products$ = of(products);
      });
    this.registerPriceUpdater(this.items.at(0) as FormGroup);

    this.usersService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = users;
        this.prefillUser();
      });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  buildItem(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [{ value: 0, disabled: true }]
    });
  }

  addItem(): void {
    this.items.push(this.buildItem());
    this.registerPriceUpdater(this.items.at(this.items.length - 1) as FormGroup);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  submit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const payload = {
      userId: this.orderForm.value.userId,
      items: this.orderForm.value.items.map((item: any) => ({
        productId: item.productId,
        quantity: Number(item.quantity)
      }))
    };

    this.ordersService.createOrder(payload).subscribe();
  }

  private registerPriceUpdater(group: FormGroup): void {
    group
      .get('productId')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((productId: string) => {
        const product = this.products.find((p) => p.id === productId);
        if (product) {
          group.patchValue({ price: product.price }, { emitEvent: false });
        }
      });
  }

  private prefillUser(): void {
    if (!this.users.length) {
      return;
    }
    const email = this.authService.getProfile()?.email?.toLowerCase();
    const match = email
      ? this.users.find((user) => user.email?.toLowerCase() === email)
      : undefined;
    const target = match ?? this.users[0];
    this.matchedUserEmail = Boolean(match);
    this.orderForm.patchValue({ userId: target.id }, { emitEvent: false });
  }

  displayUserLabel(user: User): string {
    if (!user) {
      return '';
    }
    const composed = user.fullName?.trim();
    if (composed?.length) {
      return composed;
    }
    const fallback = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
    return fallback || user.email;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

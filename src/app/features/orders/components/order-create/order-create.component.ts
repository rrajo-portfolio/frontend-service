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
import { finalize, takeUntil } from 'rxjs/operators';
import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TranslationService } from '../../../../core/services/translation.service';

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
  readonly currencyOptions = ['EUR', 'USD', 'GBP'];
  isSubmitting = false;
  submissionErrorSummary?: string;
  submissionErrorDescription?: string;
  submissionErrorList: string[] = [];
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly ordersService: OrdersService,
    private readonly catalogService: CatalogService,
    private readonly usersService: UsersService,
    public readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      userId: ['', Validators.required],
      currency: [
        'EUR',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
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
    if (this.items.length === 0) {
      this.addItem();
    }
  }

  submit(): void {
    if (this.orderForm.invalid || this.items.length === 0) {
      this.orderForm.markAllAsTouched();
      this.handleInvalidSubmission();
      return;
    }

    this.resetSubmissionErrors();
    this.isSubmitting = true;

    const payload = {
      userId: this.orderForm.value.userId,
      currency: (this.orderForm.value.currency ?? 'EUR').toString().toUpperCase(),
      items: this.items.controls.map((group) => {
        const raw = group.getRawValue();
        return {
          productId: raw.productId,
          quantity: Number(raw.quantity ?? 0)
        };
      })
    };

    this.ordersService
      .createOrder(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.notificationService.success(
            this.translationService.translate('orders.create.notifications.success')
          );
          this.resetForm();
        },
        error: (error) => {
          this.submissionErrorSummary = this.translationService.translate(
            'orders.create.error.summaryTitle'
          );
          this.submissionErrorDescription = this.translationService.translate(
            'orders.create.error.summaryDescription'
          );
          const backendErrors = this.extractBackendErrors(error);
          this.submissionErrorList =
            backendErrors.length > 0
              ? backendErrors
              : [
                  this.translationService.translate(
                    'orders.create.notifications.error'
                  )
                ];
          this.notificationService.error(
            this.translationService.translate('orders.create.notifications.error')
          );
          console.error('[order-create] failed to create order', error);
        }
      });
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

  get orderTotal(): number {
    return this.items.controls.reduce((total, control) => {
      const { price, quantity } = control.getRawValue();
      const amount = Number(price ?? 0) * Number(quantity ?? 0);
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  }

  get orderCurrency(): string {
    const value = this.orderForm.get('currency')?.value;
    return (value ?? 'EUR').toString().toUpperCase();
  }

  trackOrderItem(index: number): number {
    return index;
  }

  trackProduct(_: number, product: Product | undefined): string | number {
    return product?.id ?? _;
  }

  trackUser(_: number, user: User | undefined): string | number {
    return user?.id ?? _;
  }

  private handleInvalidSubmission(): void {
    this.submissionErrorSummary = this.translationService.translate(
      'orders.create.error.summaryTitle'
    );
    this.submissionErrorDescription = this.translationService.translate(
      'orders.create.error.summaryDescription'
    );
    this.submissionErrorList = this.collectFormErrors();
    if (!this.submissionErrorList.length) {
      this.submissionErrorList = [
        this.translationService.translate('orders.create.errors.itemsRequired')
      ];
    }
    console.warn('[order-create] invalid form submission', this.submissionErrorList);
  }

  private collectFormErrors(): string[] {
    const errors: string[] = [];
    const userControl = this.orderForm.get('userId');
    const currencyControl = this.orderForm.get('currency');
    if (userControl?.hasError('required')) {
      errors.push(this.translationService.translate('orders.create.errors.userRequired'));
    }

    if (currencyControl?.hasError('required')) {
      errors.push(
        this.translationService.translate('orders.create.errors.currencyRequired')
      );
    } else if (
      currencyControl?.hasError('minlength') ||
      currencyControl?.hasError('maxlength')
    ) {
      errors.push(
        this.translationService.translate('orders.create.errors.currencyLength')
      );
    }

    if (!this.items.length) {
      errors.push(this.translationService.translate('orders.create.errors.itemsRequired'));
      return errors;
    }

    this.items.controls.forEach((group, index) => {
      const productCtrl = group.get('productId');
      const quantityCtrl = group.get('quantity');
      const reference = this.formatLineReference(index);

      if (productCtrl?.hasError('required')) {
        errors.push(
          `${reference}: ${this.translationService.translate(
            'orders.create.errors.productRequired'
          )}`
        );
      }

      if (quantityCtrl?.hasError('required')) {
        errors.push(
          `${reference}: ${this.translationService.translate(
            'orders.create.errors.quantityRequired'
          )}`
        );
      } else if (quantityCtrl?.hasError('min')) {
        errors.push(
          `${reference}: ${this.translationService.translate(
            'orders.create.errors.quantityMin'
          )}`
        );
      }
    });

    return errors;
  }

  private extractBackendErrors(error: unknown): string[] {
    const detail = (error as { error?: unknown })?.error as
      | { errors?: string[]; detail?: string }
      | undefined;
    if (detail?.errors?.length) {
      return detail.errors;
    }
    if (detail?.detail) {
      return [detail.detail];
    }
    return [];
  }

  private resetSubmissionErrors(): void {
    this.submissionErrorSummary = undefined;
    this.submissionErrorDescription = undefined;
    this.submissionErrorList = [];
  }

  private resetForm(): void {
    this.orderForm.reset({ currency: 'EUR' });
    this.items.clear();
    this.addItem();
    this.prefillUser();
    this.resetSubmissionErrors();
  }

  private formatLineReference(index: number): string {
    const template = this.translationService.translate(
      'orders.create.errors.itemReference'
    );
    return template.replace('{index}', String(index + 1));
  }
}

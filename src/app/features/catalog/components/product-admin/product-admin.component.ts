import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import {
  Product,
  ProductPayload,
  ProductStatus
} from '../../../../shared/models/product.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { TranslationService } from '../../../../core/services/translation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  productForm: FormGroup;
  products: Product[] = [];
  loading = false;
  editingProduct?: Product;
  statusUpdating: Record<string, boolean> = {};
  isSaving = false;
  showAdvanced = false;
  submissionError?: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly catalogService: CatalogService,
    private readonly notificationService: NotificationService,
    private readonly translationService: TranslationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      sku: ['', [Validators.required, Validators.minLength(6)]],
      price: [0, [Validators.required, Validators.min(0)]],
      currency: ['EUR', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      tags: ['']
    });
  }

  ngOnInit(): void {
    this.handlePrefillFromRoute();
    this.loadProducts();
  }

  get formTitle(): string {
    if (this.editingProduct) {
      return this.translationService.translate('catalog.admin.form.editTitle');
    }
    return this.translationService.translate('catalog.admin.form.createTitle');
  }

  loadProducts(): void {
    this.loading = true;
    this.catalogService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notificationService.error(
          this.translationService.translate('catalog.admin.notifications.loadError')
        );
      }
    });
  }

  submit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.submissionError = this.translationService.translate(
        'catalog.admin.notifications.invalidForm'
      );
      return;
    }

    this.submissionError = undefined;
    this.isSaving = true;
    const payload = this.buildPayload();
    const request$ = this.editingProduct
      ? this.catalogService.updateProduct(this.editingProduct.id, payload)
      : this.catalogService.createProduct(payload);

    request$
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.submissionError = undefined;
          this.notificationService.success(
            this.translationService.translate(
              this.editingProduct
                ? 'catalog.admin.notifications.updated'
                : 'catalog.admin.notifications.created'
            )
          );
          this.clearForm();
          this.loadProducts();
        },
        error: (err) => {
          this.submissionError =
            (err?.error?.message as string | undefined) ??
            this.translationService.translate('catalog.admin.notifications.saveError');
          this.notificationService.error(
            this.translationService.translate('catalog.admin.notifications.saveError')
          );
        }
      });
  }

  editProduct(product: Product): void {
    this.applyEditingProduct(product);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { productId: product.id },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  toggleStatus(product: Product): void {
    if (!product.id) {
      return;
    }
    const targetStatus: ProductStatus = product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.statusUpdating[product.id] = true;
    this.catalogService.updateAvailability(product.id, targetStatus).subscribe({
      next: () => {
        this.statusUpdating[product.id] = false;
        this.loadProducts();
        this.notificationService.success(
          this.translationService.translate('catalog.admin.notifications.statusUpdated')
        );
      },
      error: () => {
        this.statusUpdating[product.id] = false;
        this.notificationService.error(
          this.translationService.translate('catalog.admin.notifications.saveError')
        );
      }
    });
  }

  clearForm(resetQueryParams: boolean = true): void {
    this.editingProduct = undefined;
    this.submissionError = undefined;
    this.productForm.reset({
      name: '',
      description: '',
      sku: '',
      price: 0,
      currency: 'EUR',
      stockQuantity: 0,
      tags: ''
    });

    if (resetQueryParams) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { productId: null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
        state: {}
      });
    }
  }

  displayTags(product: Product): string {
    return (product.tags || []).join(', ');
  }

  private buildPayload(): ProductPayload {
    const { name, description, sku, price, currency, stockQuantity, tags } =
      this.productForm.value;
    return {
      name: (name ?? '').trim(),
      description: description?.trim(),
      sku: (sku ?? '').trim().toUpperCase(),
      price: Number(price ?? 0),
      currency: (currency ?? 'EUR').toUpperCase(),
      stockQuantity: Number(stockQuantity ?? 0),
      tags: this.extractTags(tags)
    };
  }

  private extractTags(value?: string): string[] | undefined {
    if (!value) {
      return undefined;
    }
    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    return tags.length ? tags : undefined;
  }

  private handlePrefillFromRoute(): void {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const productId = params.get('productId');
        if (productId && this.editingProduct?.id !== productId) {
          const productFromState = (history.state?.product ?? undefined) as
            | Product
            | undefined;
          if (productFromState && productFromState.id === productId) {
            this.applyEditingProduct(productFromState);
          } else {
            this.loadProductForEditing(productId);
          }
        }

        if (!productId && this.editingProduct) {
          this.clearForm(false);
        }
      });
  }

  private loadProductForEditing(productId: string): void {
    this.catalogService.getProduct(productId).subscribe({
      next: (product) => this.applyEditingProduct(product),
      error: () => {
        this.notificationService.error(
          this.translationService.translate('catalog.admin.notifications.loadError')
        );
        this.clearForm();
      }
    });
  }

  private applyEditingProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      currency: (product.currency || 'EUR').toUpperCase(),
      stockQuantity: product.stockQuantity ?? 0,
      tags: (product.tags || []).join(', ')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import {
  Product,
  ProductPayload,
  ProductStatus
} from '../../../../shared/models/product.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  loading = false;
  editingProduct?: Product;
  statusUpdating: Record<string, boolean> = {};

  constructor(
    private readonly fb: FormBuilder,
    private readonly catalogService: CatalogService,
    private readonly notificationService: NotificationService,
    private readonly translationService: TranslationService
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
      return;
    }

    const payload = this.buildPayload();
    const request$ = this.editingProduct
      ? this.catalogService.updateProduct(this.editingProduct.id, payload)
      : this.catalogService.createProduct(payload);

    request$.subscribe({
      next: () => {
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
      error: () => {
        this.notificationService.error(
          this.translationService.translate('catalog.admin.notifications.saveError')
        );
      }
    });
  }

  editProduct(product: Product): void {
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

  clearForm(): void {
    this.editingProduct = undefined;
    this.productForm.reset({
      name: '',
      description: '',
      sku: '',
      price: 0,
      currency: 'EUR',
      stockQuantity: 0,
      tags: ''
    });
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
}

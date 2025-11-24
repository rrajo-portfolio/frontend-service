import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogService } from '../../services/catalog.service';
import { Product } from '../../../../shared/models/product.model';
import { CartService } from '../../../../core/services/cart.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslationService } from '../../../../core/services/translation.service';
import { PrefetchService } from '../../../../core/services/prefetch.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  selectedProduct?: Product;
  canUseCart = false;

  constructor(
    private readonly catalogService: CatalogService,
    private readonly cartService: CartService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly translationService: TranslationService,
    private readonly prefetchService: PrefetchService
  ) {}

  ngOnInit(): void {
    this.canUseCart = this.authService.hasRole('user');
    this.loadProducts();
    this.prefetchService.warmProductDetailComponent();
  }

  loadProducts(term?: string): void {
    this.products$ =
      term && term.trim().length
        ? this.catalogService.searchProducts(term.trim())
        : this.catalogService.getProducts();
  }

  openDetails(product: Product, event?: Event): void {
    event?.stopPropagation();
    this.selectedProduct = product;
  }

  closeDetails(): void {
    this.selectedProduct = undefined;
  }

  addToCart(product: Product, event?: Event): void {
    event?.stopPropagation();
    this.cartService.addProduct(product);
    this.notificationService.success(
      this.translationService.translate('catalog.toast.added')
    );
  }
}

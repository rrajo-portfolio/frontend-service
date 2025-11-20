import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogService } from '../../services/catalog.service';
import { Product } from '../../../../shared/models/product.model';
import { CartService } from '../../../../core/services/cart.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslationService } from '../../../../core/services/translation.service';

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
    private readonly translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.canUseCart = this.authService.hasRole('user');
    this.loadProducts();
  }

  loadProducts(term?: string): void {
    this.products$ =
      term && term.trim().length
        ? this.catalogService.searchProducts(term.trim())
        : this.catalogService.getProducts();
  }

  onProductSelected(product: Product): void {
    this.selectedProduct = product;
  }

  addToCart(product: Product, event?: Event): void {
    event?.stopPropagation();
    this.cartService.addProduct(product);
    this.notificationService.success(
      this.translationService.translate('catalog.toast.added')
    );
  }
}

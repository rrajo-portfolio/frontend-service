import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ProductLocalizationService } from '../../../../shared/services/product-localization.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() product?: Product;
  @Input() displayMode: 'modal' | 'inline' = 'modal';
  @Output() close = new EventEmitter<void>();
  
  readonly defaultCurrency = 'EUR';

  constructor(
    private readonly authService: AuthService,
    private readonly productLocalization: ProductLocalizationService
  ) {}

  get canUseCart(): boolean {
    return this.authService.hasRole('user');
  }

  closeModal(): void {
    this.close.emit();
  }

  get productName(): string {
    return this.productLocalization.getName(this.product);
  }

  get productDescription(): string {
    return (
      this.productLocalization.getDescription(this.product) ||
      this.product?.description ||
      ''
    );
  }
}

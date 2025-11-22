import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { AuthService } from '../../../../core/services/auth.service';

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

  constructor(private readonly authService: AuthService) {}

  get canUseCart(): boolean {
    return this.authService.hasRole('user');
  }

  closeModal(): void {
    this.close.emit();
  }
}

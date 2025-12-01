import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductLocalizationService } from '../../services/product-localization.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() canEdit = false;
  
  @Output() edit = new EventEmitter<Product>();
  @Output() addCart = new EventEmitter<Product>();
  @Output() details = new EventEmitter<Product>();

  constructor(private localization: ProductLocalizationService) {}

  get productName(): string {
    return this.localization.getName(this.product);
  }

  get productDescription(): string {
    return this.localization.getDescription(this.product);
  }
  
  onCardClick(): void {
    this.details.emit(this.product);
  }
  
  viewDetails(event: Event): void {
    event.stopPropagation();
    this.details.emit(this.product);
  }
  
  editProduct(event: Event): void {
    event.stopPropagation();
    this.edit.emit(this.product);
  }
  
  addToCart(event: Event): void {
    event.stopPropagation();
    this.addCart.emit(this.product);
  }
  
  getStatusLabel(status?: string): string {
    if (!status) return 'Desconocido';
    const labels: Record<string, string> = {
      'ACTIVE': 'Activo',
      'INACTIVE': 'Inactivo'
    };
    return labels[status] || status;
  }
}

import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { TranslationService } from '../../core/services/translation.service';

@Injectable({ providedIn: 'root' })
export class ProductLocalizationService {
  constructor(private readonly translationService: TranslationService) {}

  getName(product?: Product | null): string {
    if (!product) {
      return '';
    }
    return this.resolveLocalizedValue(product, 'name') ?? product.name;
  }

  getDescription(product?: Product | null): string {
    if (!product) {
      return '';
    }
    return this.resolveLocalizedValue(product, 'description') ?? product.description;
  }

  private resolveLocalizedValue(
    product: Product,
    field: 'name' | 'description'
  ): string | null {
    const slug = this.getSlug(product);
    if (!slug) {
      return null;
    }
    const key = `catalog.products.${slug}.${field}`;
    const translated = this.translationService.translate(key);
    return translated === key ? null : translated;
  }

  private getSlug(product: Product): string | null {
    if (product.sku) {
      return this.normalize(product.sku);
    }
    if (product.id) {
      return this.normalize(product.id);
    }
    if (product.name) {
      return this.normalize(product.name);
    }
    return null;
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

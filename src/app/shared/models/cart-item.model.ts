import { Product } from './product.model';

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  currency: string;
  quantity: number;
}

export function toCartItem(product: Product): CartItem {
  return {
    productId: product.id,
    productName: product.name,
    price: product.price,
    currency: product.currency,
    quantity: 1
  };
}

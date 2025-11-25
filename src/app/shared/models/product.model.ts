export interface Product {
  id: string;
  name: string;
  description: string;
  sku?: string;
  price: number;
  currency: string;
  tags: string[];
  status?: ProductStatus;
  stockQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
  lastUpdatedAt?: string;
}

export type ProductStatus = 'ACTIVE' | 'INACTIVE';

export interface ProductPayload {
  name: string;
  description?: string;
  sku: string;
  price: number;
  currency: string;
  stockQuantity: number;
  tags?: string[];
}

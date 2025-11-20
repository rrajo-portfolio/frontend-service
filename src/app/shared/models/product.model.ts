export interface Product {
  id: string;
  name: string;
  description: string;
  sku?: string;
  price: number;
  currency: string;
  tags: string[];
  status?: string;
  stockQuantity?: number;
  createdAt: string;
  updatedAt?: string;
}

import { Product } from '../../product/models/product.model';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
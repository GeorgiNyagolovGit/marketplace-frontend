import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../../product/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'ecommerce-cart';

  private readonly cartSubject = new BehaviorSubject<CartItem[]>(
    this.loadCart()
  );

  cart$ = this.cartSubject.asObservable();

  getItems(): CartItem[] {
    return this.cartSubject.value;
  }

  getTotalItems(): number {
    return this.getItems().reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  getTotalPrice(): number {
    return this.getItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  addItem(product: Product, quantity = 1): void {
    if (quantity < 1 || product.stock < 1) {
      return;
    }

    const items = [...this.getItems()];
    const existingItem = items.find(
      item => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity = Math.min(
        existingItem.quantity + quantity,
        product.stock
      );
    } else {
      items.push({
        id: product.id,
        product,
        quantity: Math.min(quantity, product.stock)
      });
    }

    this.updateCart(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = this.getItems()
      .map(item => {
        if (item.product.id !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(
            Math.max(1, quantity),
            item.product.stock
          )
        };
      });

    this.updateCart(items);
  }

  removeItem(productId: number): void {
    const items = this.getItems().filter(
      item => item.product.id !== productId
    );

    this.updateCart(items);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  private updateCart(items: CartItem[]): void {
    this.cartSubject.next(items);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  }

  private loadCart(): CartItem[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    try {
      const savedCart = localStorage.getItem(this.storageKey);
      if (!savedCart) {
        return [];
      }

      const parsedCart: unknown = JSON.parse(savedCart);
      if (!Array.isArray(parsedCart)) {
        localStorage.removeItem(this.storageKey);
        return [];
      }

      const validItems = parsedCart.filter((item): item is CartItem =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.quantity === 'number' &&
        Number.isFinite(item.quantity) &&
        item.quantity > 0 &&
        typeof item.product === 'object' &&
        item.product !== null &&
        typeof item.product.id === 'number' &&
        typeof item.product.price === 'number' &&
        typeof item.product.stock === 'number'
      );

      if (validItems.length !== parsedCart.length) {
        localStorage.setItem(this.storageKey, JSON.stringify(validItems));
      }

      return validItems;
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }
}

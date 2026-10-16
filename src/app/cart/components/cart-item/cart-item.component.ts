import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;

  @Output() quantityChange = new EventEmitter<{
    productId: number;
    quantity: number;
  }>();

  @Output() remove = new EventEmitter<number>();

  decreaseQuantity(): void {
    if (this.item.quantity > 1) {
      this.quantityChange.emit({
        productId: this.item.product.id,
        quantity: this.item.quantity - 1
      });
    }
  }

  increaseQuantity(): void {
    if (this.item.quantity < this.item.product.stock) {
      this.quantityChange.emit({
        productId: this.item.product.id,
        quantity: this.item.quantity + 1
      });
    }
  }

  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = Number(input.value);

    if (Number.isInteger(quantity) && quantity >= 1) {
      this.quantityChange.emit({
        productId: this.item.product.id,
        quantity: Math.min(quantity, this.item.product.stock)
      });
    }
  }

  removeItem(): void {
    this.remove.emit(this.item.product.id);
  }
}
import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CheckoutFormComponent } from '../../components/checkout-form/checkout-form.component';
import { CartService } from '../../../cart/services/cart.service';
import { OrderService } from '../../services/order.service';
import { CreateOrderRequest } from '../../models/create-order-request.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, CheckoutFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  totalPrice = 0;
  loading = false;
  errorMessage = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  placeOrder(request: CreateOrderRequest): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.orderService.createOrder(request).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/orders', order.id]);
      },
      error: () => {
        this.errorMessage = 'Could not place your order. Please try again.';
        this.loading = false;
      }
    });
  }
}
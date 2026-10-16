import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateOrderRequest } from '../../models/create-order-request.model';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent {
  @Output() submitOrder = new EventEmitter<CreateOrderRequest>();

  shippingAddress = '';
  phone = '';

  onSubmit(): void {
    this.submitOrder.emit({
      shippingAddress: this.shippingAddress,
      phone: this.phone
    });
  }
}
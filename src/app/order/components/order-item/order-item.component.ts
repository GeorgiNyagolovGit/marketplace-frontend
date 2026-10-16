import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { OrderItem } from '../../models/order.model';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent {
  @Input({ required: true }) item!: OrderItem;
}
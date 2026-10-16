export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  status: string;
  totalPrice: number;
  shippingAddress: string;
  phone: string;
  createdAt: string;
  items: OrderItem[];
}
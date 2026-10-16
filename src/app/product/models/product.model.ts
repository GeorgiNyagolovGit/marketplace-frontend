export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  active: boolean;
  category: {
    id: number;
    name: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}
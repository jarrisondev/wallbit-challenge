export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartStats {
  totalItems: number;
  totalCost: number;
  createdAt: string;
}
export enum OrderStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Returned = 'Returned',
  Fulfilled = 'Fulfilled'
}

export interface OrderItem {
  productId: number; 
  quantity: number;
  priceAtPurchase: number;
  
}

export interface Order {
  id: string;
  userId: number;
  date: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  productDetails?: any[]; 
}
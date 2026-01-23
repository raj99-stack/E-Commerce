import { Injectable } from '@angular/core';
import { CartItem } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private discount: number = 0;
  private deliveryCharge: number = 50;

  applyCoupon(code: string, cartItems: CartItem[]): number {
    const total = this.getOriginalTotal(cartItems);
    if (code === 'newuser') {
      this.discount = Math.floor(total * 0.1);
    } else {
      this.discount = 0;
    }
    return this.discount;
  }

  getOriginalTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // order.service.ts
  getGrandTotal(cartItems: CartItem[], discount: number = this.discount): number {
    const originalTotal = this.getOriginalTotal(cartItems);
    const delivery = originalTotal > 2000 ? 0 : this.deliveryCharge;
    return originalTotal - discount + delivery;
  }

  getTotalSavings(cartItems: CartItem[], discount: number): number {
    const deliveryCharge = this.getOriginalTotal(cartItems) > 2000 ? 50 : 0;
    return discount + deliveryCharge;
  }

  placeOrder(cartItems: CartItem[]) {
    alert(`Order placed! Final amount: ₹${this.getGrandTotal(cartItems)}`);
    cartItems.length = 0; // clear cart
  }
}

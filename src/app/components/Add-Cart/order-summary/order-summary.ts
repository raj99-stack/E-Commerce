import { Component } from '@angular/core';
import { CartService } from '../../../services/cart';
import { OrderService } from '../../../services/order';
import { CartItem } from '../../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order-summary.html',
  styleUrls: ['./order-summary.css']
})
export class OrderSummary {
  couponCode: string = '';
  discount: number = 0;

  constructor(
    public cartService: CartService,
    private orderService: OrderService
  ) {}

  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  getIndividualTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getOriginalTotal(): number {
    return this.orderService.getOriginalTotal(this.cartItems);
  }

  getGrandTotal(): number {
    return this.orderService.getGrandTotal(this.cartItems, this.discount);
  }

  getTotalSavings(): number {
    return this.orderService.getTotalSavings(this.cartItems, this.discount);
  }

  applyCoupon() {
    this.discount = this.orderService.applyCoupon(this.couponCode, this.cartItems);
    if (this.discount === 0 && this.couponCode !== '') {
      alert('Invalid coupon code');
    }
  }

  proceedOrder() {
    this.orderService.placeOrder(this.cartItems);
  }
}

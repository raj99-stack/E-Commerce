import { Injectable } from '@angular/core';
import { CartItem } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  getCart(): CartItem[] {
    return [...this.cart];
  }

  addItem(item: CartItem) {
    const existing = this.cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
  }

  // ✅ Helper: add item by ID
  addItemById(itemId: number) {
  const item = this.cart.find(i => i.id === itemId);
  if (item) {
    item.quantity++;
  } else {
    // If item doesn’t exist, create a placeholder or fetch from product list
    this.cart.push({ id: itemId, name: 'Unknown', price: 0, quantity: 1 });
  }
}


  removeItem(itemId: number) {
    const item = this.cart.find(i => i.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.cart = this.cart.filter(i => i.id !== itemId);
      }
    }
  }

  deleteItem(itemId: number) {
    this.cart = this.cart.filter(i => i.id !== itemId);
  }

  clearCart() {
    this.cart = [];
  }

  isEmpty(): boolean {
    return this.cart.length === 0 || this.cart.every(i => i.quantity === 0);
  }

  hasItems(): boolean {
    return this.cart.some(i => i.quantity > 0);
  }
}

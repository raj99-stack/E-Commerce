import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';
import { MOCK_USERS } from '../models/user';
import { CartService } from './cart';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [...MOCK_USERS];
  private currentUser: User | null = null;

  constructor(private cartService: CartService) {}

  // --- USER STATE ---
  get loggedInUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  login(email: string, password: string): User | null {
    const found = this.users.find((u) => u.email === email && u.password === password);
    if (found) {
      this.currentUser = found;

      // Load saved cart into CartService
      this.cartService.clearCart();
      if (found.cart) {
        found.cart.forEach((item) => this.cartService.addItem(item));
      }

      return this.currentUser;
    }
    return null;
  }

  register(newUser: User): boolean {
    const exists = this.users.some((u) => u.email === newUser.email);
    if (exists) return false;
    this.users.push(newUser);
    return true;
  }

  logout(): void {
    if (this.currentUser) {

      this.currentUser.cart = [...this.cartService.getCart()];
    }
    this.currentUser = null;
    this.cartService.clearCart();
  }

  updateProfile(updated: User): void {
    const idx = this.users.findIndex((u) => u.id === updated.id);
    if (idx >= 0) {
      this.users[idx] = { ...updated };
      this.currentUser = { ...updated };
    }
  }

  // --- CART HELPERS ---
  addToCart(product: Product) {
    if (!this.currentUser) {
      alert('You must be logged in to add products to the cart.');
      return;
    }
    this.cartService.addItem({ ...product, quantity: 1 });
  }

  getCartCount(): number {
    return this.cartService.getCart()
      .reduce((sum, item) => sum + item.quantity, 0);
  }

  // --- WISHLIST HELPERS ---
  addToWishlist(product: Product) {
    if (!this.currentUser) {
      alert('You must be logged in to add products to the wishlist.');
      return;
    }

    if (!this.currentUser.wishlist) this.currentUser.wishlist = [];

    const existingItem = this.currentUser.wishlist.find((i) => i.id === product.id);
    if (existingItem) {
      alert('Already in wishlist')
    } else {
      this.currentUser.wishlist.push({ ...product, quantity: 1 });
    }
  }

  // --- USER LOOKUP ---
  getUserById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}

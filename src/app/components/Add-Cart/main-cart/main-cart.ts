import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart';
import { WishlistService } from '../../../services/wishlist';
import { CartItem, User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmptyCart } from '../empty-cart/empty-cart';
import { Cart } from '../cart/cart';
import { OrderSummary } from '../order-summary/order-summary';
import { Wishlist } from '../wishlist/wishlist';

@Component({
  selector: 'app-main-cart',
  imports: [CommonModule, FormsModule, EmptyCart, Cart, OrderSummary, Wishlist],
  templateUrl: './main-cart.html',
  styleUrls: ['./main-cart.css'],
})
export class MainCart {
  @Input() loggedInUser: User | null = null;
  private initialized = false;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
  ) {}

  ngOnInit() {
    if (this.loggedInUser && !this.initialized) {
      this.cartService.clearCart();
      this.loggedInUser.cart.forEach((item) => this.cartService.addItem(item));
      this.loggedInUser.wishlist.forEach((item) => this.wishlistService.addToWishlist(item));
      this.initialized = true;
    }
  }

  ngDoCheck() {
    // ✅ keep loggedInUser.cart in sync with service
    if (this.loggedInUser) {
      this.loggedInUser.cart = [...this.cartService.getCart()];
    }
  }

  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  isCartEmpty(): boolean {
    return this.cartService.isEmpty();
  }

  hasCartItems(): boolean {
    return this.cartService.hasItems();
  }

  get wishlistItems(): CartItem[] {
    return this.wishlistService.getWishlist();
  }
}

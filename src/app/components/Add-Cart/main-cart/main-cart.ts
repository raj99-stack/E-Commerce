import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart';
import { WishlistService } from '../../../services/wishlist';
import { CartItem } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmptyCart } from '../empty-cart/empty-cart';
import { Cart } from '../cart/cart';
import { OrderSummary } from '../order-summary/order-summary';
import { Wishlist } from '../wishlist/wishlist';
import { User } from '../../../models/user';

@Component({
  selector: 'app-main-cart',
  imports: [CommonModule, FormsModule, EmptyCart, Cart, OrderSummary, Wishlist],
  templateUrl: './main-cart.html',
  styleUrls: ['./main-cart.css'],
})
export class MainCart {
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) {}
  @Input() loggedInUser: User | null = null;

  ngOnChanges() {
    if (this.loggedInUser) {
      // Load user’s cart and wishlist into services
      this.loggedInUser.cart.forEach((item) => this.cartService.addItem(item));
      this.loggedInUser.wishlist.forEach((item) => this.wishlistService.addToWishlist(item));
    }
  }

  // ✅ Expose cart items from CartService
  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  // ✅ Expose wishlist items from WishlistService
  get wishlistItems(): CartItem[] {
    return this.wishlistService.getWishlist();
  }

  // Cart handlers
  handleRemove(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  handleAdd(itemId: number) {
    this.cartService.addItemById(itemId); // helper in CartService
  }

  handleDelete(itemId: number) {
    this.cartService.deleteItem(itemId);
  }

  isCartEmpty(): boolean {
    return this.cartService.isEmpty();
  }

  hasCartItems(): boolean {
    return this.cartService.hasItems();
  }

  // Wishlist handlers
  handleRemoveFromWishlist(itemId: number) {
    this.wishlistService.removeFromWishlist(itemId);
  }

  handleMoveToCart(itemId: number) {
    this.wishlistService.moveToCart(itemId);
  }

  handleAddToWishlist(itemId: number) {
    this.wishlistService.addToWishlistById(itemId); // helper in WishlistService
  }
}

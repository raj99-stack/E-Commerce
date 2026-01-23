import { Component } from '@angular/core';
import { CartService } from '../../../services/cart';
import { WishlistService } from '../../../services/wishlist';
import { CartItem } from '../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart {
  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {}

  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  onAdd(id: number) {
    this.cartService.addItemById(id);
  }

  onRemove(id: number) {
    this.cartService.removeItem(id);
  }

  onDelete(id: number) {
    this.cartService.deleteItem(id);
  }

  onAddToWishlist(id: number) {
    this.wishlistService.addToWishlistById(id);
  }

  getIndividualTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

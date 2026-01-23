import { Component } from '@angular/core';
import { WishlistService } from '../../../services/wishlist';
import { CartItem } from '../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist {
  constructor(public wishlistService: WishlistService) {}

  get wishlistItems(): CartItem[] {
    return this.wishlistService.getWishlist();
  }

  onRemove(id: number) {
    this.wishlistService.removeFromWishlist(id);
  }

  onMoveToCart(id: number) {
    this.wishlistService.moveToCart(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service'; 
import { UserService } from '../../../services/user-service'; 
import { User } from '../../../models/user';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [CommonModule, ProductCard, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class HeroPage implements OnInit {
  
  bannerMessage: string = 'Shop The Latest Products!';
  
  products: Product[] = [];
  
  loggedInUser: User | null = null;

  searchTerm: string = '';
  sortCategory: string = '';

  constructor(
    private productService: ProductService, 
    private userService: UserService,       
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch Products
    this.products = this.productService.getProducts();
    this.loggedInUser = this.userService.loggedInUser;
  }

  onAddToCart(product: Product) {
    if (!this.loggedInUser) {
      alert('Please login first to add items to cart!');
      this.router.navigate(['/login']);
      return;
    }

    this.userService.addToCart(product);
    alert("Added to Cart");
  }

  onAddToWishList(product: Product) {
    if (!this.loggedInUser) {
      alert('Please login first!');
      return;
    }
    
    this.userService.addToWishlist(product);
    alert('Added to wishlist');
  }

  get filteredProducts(): Product[] {
    let result = this.products;

    if (this.searchTerm) {
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          p.category?.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    }

    if (this.sortCategory) {
      result = result.filter(
        (p) => p.category?.toLowerCase() === this.sortCategory.toLowerCase(),
      );
    }

    return result;
  }
}

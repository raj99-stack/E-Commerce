import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service'; // ✅ Import Service
 
@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-product.html',
  styleUrls: ['./view-product.css'],
})
export class ViewProduct implements OnInit {
  // ❌ REMOVED: @Input() productList
  products: Product[] = []; // Local array to hold fetched data
 
  searchTerm: string = '';
  sortCategory: string = '';
 
  constructor(private productService: ProductService) {} // ✅ Inject Service
ngOnInit() {
  this.products = this.productService.getProducts();
}
 
 
  get filteredProducts(): Product[] {
    return this.products.filter(p => {
      const matchesSearch =
        !this.searchTerm ||
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchTerm.toLowerCase());
 
      const matchesCategory =
        !this.sortCategory || p.category === this.sortCategory;
 
      return matchesSearch && matchesCategory;
    });
  }
}
 
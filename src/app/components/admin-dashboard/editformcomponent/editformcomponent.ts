import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-editformcomponent',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editformcomponent.html',
  styleUrls: ['./editformcomponent.css']
})
export class Editformcomponent implements OnInit {
  product!: Product;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}
 
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.productService.getProductById(id);
    if (found) {
      this.product = { ...found }; // clone for editing
    }
  }
 
  onSubmit() {
    this.productService.updateProduct(this.product);
    alert('✅ Product updated successfully!');
    this.router.navigate(['/admin/manage']); // go back to list
  }
 
  // ✅ Public method for cancel button
  onCancel() {
    this.router.navigate(['/admin/manage']);
  }
}
 
 
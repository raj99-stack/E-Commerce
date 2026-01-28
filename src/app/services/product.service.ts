import { Injectable } from "@angular/core";
import { MOCK_PRODUCTS, Product } from "../models/product";
 
@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [...MOCK_PRODUCTS];
 
  getProducts(): Product[] {
    return this.products;
  }
 
  getProductsSnapshot(): Product[] {
    return this.products;
  }
 
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
 
  addProduct(newProduct: Product): void {
    const maxId = this.products.length > 0
      ? Math.max(...this.products.map(p => p.id))
      : 0;
    const productWithId = { ...newProduct, id: maxId + 1 };
    this.products.push(productWithId);
  }
 
  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
 
  updateProduct(updated: Product): void {
    this.products = this.products.map(p =>
      p.id === updated.id ? updated : p
    );
  }
}
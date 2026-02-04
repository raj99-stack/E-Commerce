import { TestBed } from '@angular/core/testing';
import { CartService } from './cart';
import { CartItem } from '../models/user';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new item', () => {
    const item: CartItem = { id: 1, name: 'Apple', quantity: 1, price:20};
    service.addItem(item);
    expect(service.getCart().length).toBe(1);
    expect(service.getCart()[0].name).toBe('Apple');
  });

  it('should increment quantity if item exists', () => {
    const item: CartItem = { id: 1, name: 'Apple', quantity: 1, price:20};
    service.addItem(item);
    service.addItem(item);
    expect(service.getCart()[0].quantity).toBe(2);
  });

  it('should remove item when quantity goes to zero', () => {
    const item: CartItem = { id: 2, name: 'Banana', quantity: 1, price:20};
    service.addItem(item);
    service.removeItem(2);
    expect(service.getCart().length).toBe(0);
  });

  it('should clear the cart', () => {
    service.addItem({ id: 3, name: 'Orange', quantity: 1, price:20 });
    service.clearCart();
    expect(service.getCart().length).toBe(0);
  });

  it('should detect empty cart correctly', () => {
    expect(service.isEmpty()).toBe(true);
    service.addItem({ id: 4, name: 'Mango', quantity: 1, price:20 });
    expect(service.isEmpty()).toBe(false);
  });

  it('should detect cart has items', () => {
    service.addItem({ id: 5, name: 'Grapes', quantity: 1, price:20 });
    expect(service.hasItems()).toBe(true);
  });
});

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order';
import { Order, OrderStatus } from '../../../models/order'; // ✅ Import Enum

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detail.html',
  styleUrls: ['./order-detail.css']
})
export class OrderDetail implements OnInit {
  order: Order | undefined;
  
  // ✅ Expose the Enum so the HTML can use it (e.g. eOrderStatus.Pending)
  eOrderStatus = OrderStatus;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    // 1. Get the ID from the URL (e.g. 'ORD-1001')
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // 2. Fetch the order (The service automatically checks if it needs to be Fulfilled)
      this.order = this.orderService.getOrderById(id);
    }
  }

  cancelOrder() {
    if (this.order) {
      const confirmCancel = confirm('Are you sure you want to cancel this order?');
      if (confirmCancel) {
        // 1. Perform the action
        this.orderService.cancelOrder(this.order.id);
        
        // ✅ 2. FIX: Re-fetch the order immediately to get the new status!
        this.order = this.orderService.getOrderById(this.order.id);
      }
    }
  }

  returnOrder() {
    if (this.order) {
      const confirmReturn = confirm('Do you want to request a return for this item?');
      if (confirmReturn) {
        // 1. Perform the action
        this.orderService.returnOrder(this.order.id);
        
        // ✅ 2. FIX: Re-fetch to update the UI
        this.order = this.orderService.getOrderById(this.order.id);
      }
    }
  }
  goBack() {
    this.router.navigate(['/orders/history']);
  }
}
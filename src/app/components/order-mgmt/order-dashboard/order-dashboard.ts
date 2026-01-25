import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// We import the Service to inject it
import { OrderService } from '../../../services/order';

@Component({
  selector: 'app-order-dashboard',
  standalone: true,
  imports: [CommonModule],
  // 1. Point to the external HTML file
  templateUrl: './order-dashboard.html',
  // 2. Point to the external CSS file
  styleUrl: './order-dashboard.css'
})
export class OrderDashboard implements OnInit {
  stats = {
    totalOrders: 0,
    totalSpent: 0,
    pendingCount: 0
  };

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    // ✅ FIX: Pass the 'activeUserId' so the service filters the data!
    const currentId = this.orderService.activeUserId;
    
    if (currentId) {
      this.stats = this.orderService.getStats(currentId);
    }
  }
}
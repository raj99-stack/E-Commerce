import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderMgmt } from '../../../services/order-mgmt';

@Component({
  selector: 'app-order-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-dashboard.html',
  styleUrl: './order-dashboard.css'
})
export class OrderDashboard implements OnInit {
  stats = {
    totalOrders: 0,
    totalSpent: 0,
    pendingCount: 0
  };

  constructor(private orderMgmt: OrderMgmt) {}

  ngOnInit() {
    // Pass the 'activeUserId' so the service filters the data!
    const currentId = this.orderMgmt.activeUserId;
    
    if (currentId) {
      this.stats = this.orderMgmt.getStats(currentId);
    }
  }
}
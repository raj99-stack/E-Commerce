import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderMgmt } from '../../../services/order-mgmt';
import { UserService } from '../../../services/user-service';
import { RouterLink, RouterOutlet } from "@angular/router"; 

@Component({
  selector: 'app-order-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './order-dashboard.html',
  styleUrls: ['./order-dashboard.css'] 
})
export class OrderDashboard implements OnInit {
  stats = {
    totalOrders: 0,
    // removed total spent from dashbord.
    // totalSpent: 0,
    pendingCount: 0
  };

  constructor(
    private orderMgmt: OrderMgmt,
    private userService: UserService 
  ) {}

  ngOnInit() {
    const user = this.userService.loggedInUser;
    if (user) {
      this.stats = this.orderMgmt.getStats(user.id);
    } else {
      console.log("No user logged in, dashboard stats unavailable.");
    }
  }
}

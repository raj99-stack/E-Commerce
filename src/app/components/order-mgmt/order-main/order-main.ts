import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { OrderMgmt } from '../../../services/order-mgmt';
import { UserService } from '../../../services/user-service';
import { OrderDashboard } from "../order-dashboard/order-dashboard";

@Component({
  selector: 'app-order-main',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderDashboard], 
  templateUrl: './order-main.html',
  styleUrls: ['./order-main.css']
})
export class OrderMain implements OnInit {

  constructor(
    private orderMgmt: OrderMgmt,
    private userService: UserService 
  ) {}

  ngOnInit() {
  const user = this.userService.loggedInUser;
  if (user) {
    console.log("Logged in user:", user);
    const orders = this.orderMgmt.getOrdersForUser();
    console.log("Orders for user:", orders);
  } else {
    console.log("No user logged in");
  }
}

}

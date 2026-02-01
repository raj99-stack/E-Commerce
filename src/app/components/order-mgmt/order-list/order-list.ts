import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { OrderMgmt } from '../../../services/order-mgmt';
import { Order, OrderStatus } from '../../../models/order';
import { OrderFilterPipe } from '../../../pipes/order-filter.pipe';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OrderFilterPipe, RouterModule], 
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css']
})
export class OrderList implements OnInit {
  orders: Order[] = [];
  searchForm: FormGroup;
  eOrderStatus = OrderStatus;

  constructor(
    private orderMgmt: OrderMgmt, 
    private fb: FormBuilder,
    private userService: UserService 
  ) {
    this.searchForm = this.fb.group({
      searchText: [''],
      status: ['All']
    });
  }

  ngOnInit() {
    const user = this.userService.loggedInUser;
    if (user) {
      console.log("Fetching orders for User ID:", user.id);
      this.orders = this.orderMgmt.getOrdersForUser(user.id);
      console.log(this.orders);
    } else {
      console.log("No user logged in, cannot fetch orders.");
      this.orders = [];
    }
  }
}

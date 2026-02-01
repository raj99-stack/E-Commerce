import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { OrderMgmt } from '../../../services/order-mgmt';
import { Order, OrderStatus } from '../../../models/order';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './order-detail.html',
  styleUrls: ['./order-detail.css']
})
export class OrderDetail implements OnInit {
  order: Order | undefined;
  
  orderUser: User | undefined;
  
  eOrderStatus = OrderStatus; 
  showCancelParams = false;
  showReturnParams = false;
  actionReason = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderMgmt: OrderMgmt,
    private userService: UserService 
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.order = this.orderMgmt.getOrderById(id);
      

      if (this.order) {
        this.orderUser = this.userService.getUserById(this.order.userId);
      }
    }
  }

  
  initiateCancel() {
    this.showCancelParams = true;
    this.showReturnParams = false;
    this.actionReason = ''; 
  }

  submitCancel() {
    if (!this.actionReason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }
    if (this.order) {
      this.orderMgmt.cancelOrder(this.order.id);
      this.showCancelParams = false;
      this.order = this.orderMgmt.getOrderById(this.order.id); 
    }
  }

  initiateReturn() {
    this.showReturnParams = true;
    this.showCancelParams = false;
    this.actionReason = '';
  }

  submitReturn() {
    if (!this.actionReason.trim()) {
      alert('Please describe the issue with the item.');
      return;
    }
    if (this.order) {
      this.orderMgmt.returnOrder(this.order.id);
      this.showReturnParams = false;
      this.order = this.orderMgmt.getOrderById(this.order.id);
    }
  }

  closeActionBox() {
    this.showCancelParams = false;
    this.showReturnParams = false;
  }

  goBack() {
    this.router.navigate(['/orders/history']);
  }
}
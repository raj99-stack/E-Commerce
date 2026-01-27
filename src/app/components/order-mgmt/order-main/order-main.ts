import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // RouterModule
import { OrderMgmt } from '../../../services/order-mgmt';

@Component({
  selector: 'app-order-main',
  standalone: true,
  imports: [CommonModule, RouterModule], // RouterModule 
  templateUrl: './order-main.html',
  styleUrls: ['./order-main.css'] //  CSS
})
export class OrderMain {
@Input() currentUserId: number | undefined;

  constructor(private orderMgmt: OrderMgmt) {}

  ngOnInit() {
    // ✅ Fix: Pass the Input ID to the Service so children can see it
    if (this.currentUserId) {
      this.orderMgmt.activeUserId = this.currentUserId;
    }
  }
}
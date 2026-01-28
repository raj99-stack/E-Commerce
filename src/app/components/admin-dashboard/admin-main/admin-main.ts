import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // ✅ Import Router stuff
import { UserService } from '../../../services/user-service';
 
@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add RouterModule
  templateUrl: './admin-main.html',
  styleUrls: ['./admin-main.css'],
})
export class AdminMain {
  // ❌ No more productList, currIndex, or view variables!
  // The Router handles which component is shown.
 
  constructor(
    private userService: UserService,
    private router: Router
  ) {}
 
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
 
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  
  constructor(public userService: UserService, 
    private router: Router
  ) {}

  get currentUser(): User | null {
    return this.userService.loggedInUser;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}

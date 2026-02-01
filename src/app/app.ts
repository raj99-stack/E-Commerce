import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/shared/navbar/navbar';
import { FooterComponent } from './components/shared/footer-component/footer-component';
import { UserService } from './services/user-service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    Navbar, 
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  
  loggedInUser: User | null = null;
  title = 'E-Commerce(Shopping Cart)';

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loggedInUser = this.userService.loggedInUser;
  }

  handleLogout() {
    this.userService.logout(); 
    this.loggedInUser = null; 
    this.router.navigate(['/home']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { LoginForm } from '../login-form/login-form';
import { RegisterForm } from '../register-form/register-form';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginForm,
    RegisterForm
  ],
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.css'],
})
export class AuthPage {
  staticMessage: string = 'Welcome to the E-Commerce Portal!';
  
  showLogin: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router 
  ) {}

  toggleForm() {
  if (this.showLogin) {
    this.router.navigate(['/register']);
  } else {
    this.router.navigate(['/login']);
  }
}

//Login redirect wrt role
  onLoginSuccess(user: User) {
    console.log('Login successful:', user.name);
    // this.userService.login(user.email, user.password); 

    if (user.role === 'admin') {
      this.router.navigate(['/admin']); 
    } else {
      this.router.navigate(['/home']);  
    }
  }
}
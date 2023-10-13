import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { User } from 'types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    username: '',
    email: '',
    password: '',
    role: '',
  }; // User object to store registration data

  constructor(
    private router: Router,
    private userServiceService: UserServiceService
  ) {}

  passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  register() {
    // Call the UserService to register the user
    this.userServiceService.registerUser(this.user).subscribe(
      (response) => {
        // Registration successful, redirect to login page
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle registration error, display error message
        console.error('Registration error:', error);
      }
    );
  }
}

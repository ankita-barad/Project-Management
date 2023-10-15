import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: any = {}; // User object to store login data

  constructor(
    private router: Router,
    private userServiceService: UserServiceService
  ) {}

  passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  login() {
    // Call the UserService to log in the user
    this.userServiceService.loginUser(this.user).subscribe(
      (response) => {
        // Login successful, handle the response (e.g., store user data, navigate to dashboard)
        console.log('Login successful:', response);

        if (response.token) {
          // Store the token in local storage
          localStorage.setItem('authToken', response.token);
        }
        // For simplicity, we'll navigate to the dashboard route on successful login
        this.router.navigate(['/project']);
      },
      (error) => {
        // Handle login error, display error message
        console.error('Login error:', error);
        // Clear the password field on login error
        this.user.password = '';
      }
    );
  }
}

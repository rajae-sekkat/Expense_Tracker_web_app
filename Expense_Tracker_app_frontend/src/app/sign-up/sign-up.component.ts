import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { AuthService } from '../services/auth.service';  // Import the AuthService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  message: string = '';
  isLoading: boolean = false;  

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Check if the passwords match
    if (this.user.password !== this.user.confirmPassword) {
      this.message = 'Passwords do not match!';
      return;
    }

    // Call the sign-up API
    this.authService.signUp(this.user).subscribe({
      next: (response) => {
        this.message = response.message || 'Sign-up successful!';
        // Redirect to login page after successful sign-up
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.message = error.error?.message || 'An error occurred during sign-up.';
      }
    });
  }
}

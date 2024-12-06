import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogService } from '../services/log.service'; // Correctly import the service

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    DividerModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };
  message: string = '';
  isLoading: boolean = false;

  // Inject the LogService and Router in the constructor
  constructor(private logService: LogService, private router: Router) {}

  onLogin() {
    this.isLoading = true;
    this.message = '';

    // Call the login API via LogService
    this.logService.login(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.message = response.message || 'Login successful!';
        // Redirect to the home page after successful login
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        this.message = error.error?.message || 'Invalid username or password.';
      }
    });
  }
}

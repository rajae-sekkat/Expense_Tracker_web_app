/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/sign-in/sign-in.component';
import { SignUpComponent } from './app/sign-up/sign-up.component';
import { HomeComponent } from './app/home/home.component';
import { provideRouter } from '@angular/router'; // Import for routing

export const appConfig = {
  providers: [
    provideHttpClient(withFetch()), // Provide HttpClient
    provideRouter([
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' }, // Default route redirects to Sign-In
      { path: 'sign-in', component: LoginComponent }, // Route for Sign-In
      { path: 'sign-up', component: SignUpComponent }, // Route for Sign-Up
      { path: 'home', component: HomeComponent }, // Route for Home
    ]), // Provide routing configuration
  ],
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

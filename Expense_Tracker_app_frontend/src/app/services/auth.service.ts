import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private apiUrl = 'http://localhost:5011/api/Auth/signup';

  constructor(private http: HttpClient) { }

  // Retrieve the username from localStorage
  getCurrentUser(): string | null {
    return localStorage.getItem('username');
  }

  // Set the username in localStorage
  setCurrentUser(username: string): void {
    localStorage.setItem('username', username);
  }

  // Clear the user session
  logout(): void {
    localStorage.removeItem('username');
  }
  signUp(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:3000/api/auth/login', loginData)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token); // Store token
          this.router.navigate(['/dashboard']);     // Redirect after login
        },
        error: (err) => {
          alert('Login failed: ' + err.error.message);
        }
      });
  }
}

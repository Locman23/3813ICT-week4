import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  model = { email: '', password: '' };
  error = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.error = '';
    this.loading = true;

    this.http.post<any>('http://localhost:3000/api/auth', {
      email: this.model.email,
      password: this.model.password
    }).subscribe({
      next: (user) => {
        if (!user?.valid) {
          this.error = 'Invalid email or password.';
          this.loading = false;
          return;
        }
        localStorage.setItem('currentUser', JSON.stringify(user)); // string only
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.error = 'Login service unavailable.';
        this.loading = false;
      }
    });
  }
}

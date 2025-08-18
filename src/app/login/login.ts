import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';       // for *ngIf, etc.
import { FormsModule } from '@angular/forms';         // for [(ngModel)]
import { Router } from '@angular/router';             // for navigation

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  model = { email: '', password: '' };
  error = '';

  // Hard-coded users (3)
  private users = [
    { email: 'alice@example.com',   password: 'letmein' },
    { email: 'bob@example.com',     password: 'opensesame' },
    { email: 'charlie@example.com', password: 'password123' }
  ];

  constructor(private router: Router) {}

  login() {
    const ok = this.users.some(u =>
      u.email.trim().toLowerCase() === this.model.email.trim().toLowerCase() &&
      u.password === this.model.password
    );

    if (!ok) {
      this.error = 'Invalid email or password.';      // show error
      return;
    }

    this.error = '';
    this.router.navigate(['/profile']);               // redirect on success
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: {
    username: string;
    birthdate: string;
    age: number;
    email: string;
    valid: boolean;
  } | null = null;

  saved = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const raw = localStorage.getItem('currentUser');
    if (!raw) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = JSON.parse(raw);
  }

  saveProfile(): void {
    if (!this.user) return;
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.saved = true;
    setTimeout(() => (this.saved = false), 1500);
  }
}

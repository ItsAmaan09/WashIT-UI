import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userName = '';
  password = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService
      .login({ username: this.userName, password: this.password })
      .subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
          console.log('Login Success');
        },
        error: (err) => {
          alert(JSON.stringify(err));
          this.error = 'Invalid Credentials';
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userName = '';
  password = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    this.authService
      .login({ username: this.userName, password: this.password })
      .subscribe({
        next: (res) => {
          debugger;
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

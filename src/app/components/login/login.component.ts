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
  errorUserName: string = '';
  errorPassword: string = '';
  isLoginClicked: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    this.isLoginClicked = true;

    this.authService
      .login({ username: this.userName, password: this.password })
      .subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
          alert('Login Success');
        },
        error: (ex) => {
          this.errorUserName = '';
          this.errorPassword = '';
          if (ex.error?.errors) {
            const errors = ex.error.errors;
            if (errors.UserName) this.errorUserName = errors.UserName[0];
            if (errors.Password) this.errorPassword = errors.Password[0];
          }
          if(ex.error?.Message) {
            alert(ex.error?.Message)
          }
        },
      });
  }

  onInputChange() {
    if(this.userName) this.errorUserName = '';
    if(this.password) this.errorPassword = '';
  }
}

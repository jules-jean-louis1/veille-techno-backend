import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../_services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../_services/user/user.service';
import { error } from 'console';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  email = '';
  password = '';

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('logged');
        this.getLoggedUser();
        this.router.navigateByUrl('/');
      },
      error: (error: HttpErrorResponse) => {
        console.error('log failed');
      },
    });
  }

  getLoggedUser() {
    this.userService.getMe().subscribe({
      next: () => {
        return true;
      },
      error: (error: HttpErrorResponse) => {
        console.log('get Me failed', error);
      },
    });
  }
}

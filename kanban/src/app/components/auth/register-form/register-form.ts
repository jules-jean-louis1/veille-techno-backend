import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../_services/auth/auth.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  private authService = inject(AuthService);

  email = '';
  firstName = '';
  lastName = '';
  password = '';

  onSubmit() {
    this.authService.register(this.email, this.password, this.firstName, this.lastName).subscribe({
      next: () => {
        console.log('register');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}

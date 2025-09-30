import { Component } from '@angular/core';
import { LoginForm } from '../../components/auth/login-form/login-form';
import { RegisterForm } from '../../components/auth/register-form/register-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginForm, RegisterForm, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public showForm: 'login' | 'register' = 'login';

  toggleForm() {
    this.showForm = this.showForm === 'login' ? 'register' : 'login';
  }
}

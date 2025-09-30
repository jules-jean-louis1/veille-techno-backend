import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { response } from 'express';

// La réponse attendue de l'endpoint /login
interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();
  isConnected = computed(() => this.currentUser() !== null);

  constructor() {
    // Au démarrage du service, on essaie de charger l'utilisateur si un token existe
    const token = this.getToken();
    if (token) {
      // Idéalement, vous devriez avoir un endpoint /api/users/me pour récupérer
      // les infos de l'utilisateur à partir du token et populer le signal.
      // Pour l'instant, on va laisser cela de côté pour se concentrer sur le login.
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('auth_token', response.token);
      })
    );
  }

  register(email: string, password: string, firstName: string, lastName: string) {
    return this.http
      .post(`${this.apiUrl}/auth/register`, { email, password, firstName, lastName })
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this._currentUser.set(null);
  }
}

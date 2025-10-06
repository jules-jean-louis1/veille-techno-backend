import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);
  private token: string | null = null;

  constructor() {
    // On récupère le token depuis le localStorage au moment où le service est créé
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  /**
   * Récupère les informations de l'utilisateur connecté depuis l'API.
   * @returns Un Observable avec les données de l'utilisateur.
   */
  getMe(): Observable<User> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.get<User>(`${this.apiUrl}/users/me`, { headers }).pipe(
      tap((response) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('session', JSON.stringify(response));
        }
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);
  private token = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : '';
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();
  isConnected = computed(() => this.currentUser() !== null);

  getMe(): Observable<User> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http
      .get<User>(`${this.apiUrl}/users/me`, { headers })
      .pipe(tap((response) => this._currentUser.set(response)));
  }
}

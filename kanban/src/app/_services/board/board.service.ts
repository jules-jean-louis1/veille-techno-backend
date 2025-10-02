import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  create(name: string, description: string) {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.post(`${this.apiUrl}/boards`, { name, description }, { headers }).pipe(
      tap((response) => {
        return true;
      })
    );
  }
  get(userId: number, id: number) {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.get(`${this.apiUrl}/boards?userId=${userId}`, { headers }).pipe(
      tap((response) => {
        return response;
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  create(boardId: number, name: string, description: string) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http
      .post(`${this.apiUrl}/boards/${boardId}/lists`, { name, description }, { headers })
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }
}

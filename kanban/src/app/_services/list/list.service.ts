import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);
  private token: string | null = null;
  private listsSubjet = new BehaviorSubject<any[]>([]);
  lists$ = this.listsSubjet.asObservable;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  create(boardId: number, name: string, description: string): Observable<any> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http
      .post<any>(`${this.apiUrl}/boards/${boardId}/lists`, { name, description }, { headers })
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  get(listId: number, boardId: number) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http
      .get<any[]>(`${this.apiUrl}/boards/${boardId}/lists/${listId}`, { headers })
      .subscribe((list) => {
        this.listsSubjet.next(list);
      });
  }
}

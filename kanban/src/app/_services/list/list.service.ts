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
  private listsSubject = new BehaviorSubject<any[]>([]);
  lists$ = this.listsSubject.asObservable();

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
        this.listsSubject.next(list);
      });
  }

  addList(list: any) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http.post<any>(`${this.apiUrl}/lists`, list, { headers }).subscribe((newList) => {
      const currentLists = this.listsSubject.getValue();
      this.listsSubject.next([...currentLists, newList]);
    });
  }

  deleteList(listId: number) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http.delete(`${this.apiUrl}/lists/${listId}`, { headers }).subscribe(() => {
      const currentLists = this.listsSubject.getValue();
      this.listsSubject.next(currentLists.filter((list) => list.id !== listId));
    });
  }

  updateList(list: any) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http.put<any>(`${this.apiUrl}/lists/${list.id}`, list, { headers }).subscribe((updatedList) => {
      const currentLists = this.listsSubject.getValue();
      const index = currentLists.findIndex((l) => l.id === list.id);
      currentLists[index] = updatedList;
      this.listsSubject.next([...currentLists]);
    });
  }
}

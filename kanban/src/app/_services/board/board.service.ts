import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = 'http://localhost:8080/api/v1/boards';
  private http = inject(HttpClient);
  private token: string | null = null;
  private boardsSubject = new BehaviorSubject<any[]>([]);
  boards$ = this.boardsSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  create(name: string, description: string) {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.post(`${this.apiUrl}`, { name, description }, { headers }).pipe(
      tap((response) => {
        return true;
      })
    );
  }

  get(userId?: number, boardId?: number): void {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http
      .get<any[]>(
        `${this.apiUrl}${userId !== undefined ? `?userId=${userId}` : ''}${
          boardId !== undefined ? `?boardId=${boardId}` : ''
        }`,
        { headers }
      )
      .subscribe((boards) => {
        this.boardsSubject.next(boards);
        console.log("Données reçues depuis l'API:", boards);
      });
  }

  delete(boardId: number): Observable<void> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.delete<void>(`${this.apiUrl}/${boardId}`, { headers }).pipe(
      tap(() => {
        const updatedBoards = this.boardsSubject.value.filter((board) => board.id !== boardId);
        this.boardsSubject.next(updatedBoards);
      })
    );
  }

  // Modifier une board
  editBoard(boardId: number, updatedData: any): Observable<any> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.put<any>(`${this.apiUrl}/${boardId}`, updatedData, { headers }).pipe(
      tap((updatedBoard) => {
        const updatedBoards = this.boardsSubject.value.map((board) =>
          board.id === boardId ? updatedBoard : board
        );
        this.boardsSubject.next(updatedBoards);
      })
    );
  }
}

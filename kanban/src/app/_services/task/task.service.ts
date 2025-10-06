import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/v1/task';
  private http = inject(HttpClient);
  private token: string | null = null;
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  create(task: any): Observable<any> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.post<any>(`${this.apiUrl}`, task, { headers }).pipe(
      tap((newTask) => {
        const currentTasks = this.tasksSubject.getValue();
        this.tasksSubject.next([...currentTasks, newTask]);
      })
    );
  }

  delete(taskId: any): Observable<any> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`, { headers }).pipe(
      tap((response) => {
        return response;
      })
    );
  }

  update(taskId: any, task: any): Observable<any> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, task, { headers });
  }

  addTask(task: any) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http.post<any>(`${this.apiUrl}/tasks`, task, { headers }).subscribe((newTask) => {
      const currentTasks = this.tasksSubject.getValue();
      this.tasksSubject.next([...currentTasks, newTask]);
    });
  }

  deleteTask(taskId: number) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http.delete(`${this.apiUrl}/tasks/${taskId}`, { headers }).subscribe(() => {
      const currentTasks = this.tasksSubject.getValue();
      this.tasksSubject.next(currentTasks.filter((task) => task.id !== taskId));
    });
  }

  updateTask(task: any) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http.put<any>(`${this.apiUrl}/tasks/${task.id}`, task, { headers }).subscribe((updatedTask) => {
      const currentTasks = this.tasksSubject.getValue();
      const index = currentTasks.findIndex((t) => t.id === task.id);
      currentTasks[index] = updatedTask;
      this.tasksSubject.next([...currentTasks]);
    });
  }
}

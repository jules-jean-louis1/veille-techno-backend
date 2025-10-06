import { Component, inject, Input } from '@angular/core';
import { TaskFormComponent } from '../../task/task-form/task-form';
import { TaskCardComponent } from '../../task/task-card/task-card';
import { TaskService } from '../../../_services/task/task.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskCardComponent],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent {
  @Input() list: any;
  tasks: any[] = [];
  taskService = inject(TaskService);

  ngOnChanges() {
    console.log('Données reçues dans ListComponent:', this.list);
    this.tasks = this.list?.tasks || [];
  }

  trackByTaskId(index: number, task: any): number {
    return task.id;
  }

  addTaskToList(newTask: any) {
    if (!newTask.listId) {
      console.error('La tâche ajoutée ne contient pas de liste valide :', newTask);
      return;
    }
    if (newTask.listId === this.list.id) {
      this.tasks = [...this.tasks, newTask];
    }
  }

  deleteTaskFromList(taskId: any) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  updateTaskInList(updatedTask: any) {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasks = [...this.tasks];
    }
  }
}

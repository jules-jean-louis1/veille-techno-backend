import { Component, EventEmitter, inject, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../../_services/task/task.service';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../../_services/board/board.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule, CommonModule], // Added CommonModule for *ngIf
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: any;
  @Output() taskDeleted = new EventEmitter<any>();
  @Output() taskUpdated = new EventEmitter<any>();
  taskService = inject(TaskService);
  boardService = inject(BoardService);
  isEditing = false;
  lists = <any[]>[];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.boardService.boards$.subscribe((boards: any) => {
      this.lists = boards[0].lists || [];
    });
    if (!this.task.listId) {
      const containingList = this.lists.find((list: any) =>
        list.tasks?.some((t: any) => t.id === this.task.id)
      );
      if (containingList) {
        this.task.listId = containingList.id;
      }
    }
  }

  deleteTask() {
    this.taskService.delete(this.task.id).subscribe({
      next: () => {
        console.log('Tâche supprimée :', this.task.id);
        this.taskDeleted.emit(this.task.id); // Émettre l'ID de la tâche supprimée
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la tâche :', err);
      },
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    console.log('isEditing:', this.isEditing);
  }

  saveTask() {
    const task = {
      name: this.task.name,
      description: this.task.description,
      list: { id: parseInt(this.task.listId) },
    };
    this.taskService.update(this.task.id, task).subscribe({
      next: (updatedTask) => {
        this.taskUpdated.emit(updatedTask); // Vérifiez que l'événement est bien émis
        this.isEditing = false;
        this.cdr.detectChanges(); // Forcer la détection des changements
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la tâche :', err);
      },
    });
  }

  isTaskInList(taskId: number, list: any): boolean {
    console.log('task', taskId, 'lists', list);
    return list.tasks?.some((t: any) => t.id === taskId);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskService } from '../../../_services/task/task.service';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../../_services/board/board.service';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css'],
})
export class TaskCardComponent {
  @Input() task: any;
  @Output() taskDeleted = new EventEmitter<any>(); // Émetteur d'événement
  taskService = inject(TaskService);
  boardService = inject(BoardService);
  isEditing = false;
  lists = <any[]>[];

  ngAfterViewInit() {

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
  }

  saveTask() {
    this.taskService.update(this.task.id, this.task).subscribe({
      next: (updatedTask) => {
        console.log('Tâche mise à jour :', updatedTask);
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la tâche :', err);
      },
    });
  }
}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskService } from '../../../_services/task/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css'],
})
export class TaskCardComponent {
  @Input() task: any;
  @Output() taskDeleted = new EventEmitter<any>(); // Émetteur d'événement
  taskService = inject(TaskService);

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
}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../_services/task/task.service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskFormComponent {
  @Input() listId!: number;
  @Output() taskCreated = new EventEmitter<any>(); // Émetteur d'événement
  private taskService = inject(TaskService);
  public showForm: boolean = false;
  name = '';
  description = '';

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    const task = {
      name: this.name,
      list: { id: this.listId },
      description: this.description,
    };
    this.taskService.create(task).subscribe({
      next: (newTask) => {
        console.log('Nouvelle tâche ajoutée :', newTask);
        this.taskCreated.emit(newTask); // Émettre l'événement
        this.toggleForm(); // Fermer le formulaire après la création
      },
      error: (err) => {
        console.error('Erreur lors de la création de la tâche :', err);
      },
    });
  }
}
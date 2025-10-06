import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListService } from '../../../_services/list/list.service';

@Component({
  selector: 'app-list-form',
  imports: [FormsModule],
  templateUrl: './list-form.html',
  styleUrl: './list-form.css',
})
export class ListFormComponent {
  @Input() id!: number;
  @Output() listCreated = new EventEmitter<any>();
  private listService = inject(ListService);
  public showForm: boolean = false;
  name = '';
  description = '';

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    this.listService.create(this.id, this.name, this.description).subscribe({
      next: (resp) => {
        this.listCreated.emit(resp);
        this.toggleForm(); 
        console.log(resp);
      },
    });
  }
}

import { Component, inject, Input } from '@angular/core';
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
        console.log(resp);
      },
    });
  }
}

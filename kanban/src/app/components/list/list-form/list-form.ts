import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListService } from '../../../_services/list/list.service';

@Component({
  selector: 'app-list-form',
  imports: [FormsModule],
  templateUrl: './list-form.html',
  styleUrl: './list-form.css'
})
export class ListForm {
  private listService = inject(ListService)

  name = '';
  description = '';

  onSubmit(){}
}

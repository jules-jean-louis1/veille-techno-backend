import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../../_services/board/board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BoardDialogService } from '../../../_services/board/board-dialog.service';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule],
  templateUrl: './board-form.html',
  styleUrl: './board-form.css',
})
export class BoardForm {
  private boardService = inject(BoardService);
  public dialogRef = inject(MatDialogRef<BoardForm>);
  private boardDialogService = inject(BoardDialogService);
  mode: 'edit' | 'create' = 'create';
  data: any = {};

  ngOnInit() {
    // Récupérer le mode et les données
    this.boardDialogService.mode$.subscribe((mode) => (this.mode = mode));
    this.boardDialogService.data$.subscribe((data) => (this.data = data || {}));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.mode === 'edit') {
      const updatedData = { name: this.data.name, description: this.data.description };
      console.log(updatedData);
      this.boardService.editBoard(this.data.id, updatedData).subscribe(() => {
        console.log('Board modifiée:', this.data.id);
      });
    } else {
      console.log('save', this.data);
      this.boardService.create(this.data.name, this.data.description).subscribe({
        next: (newBoard) => {
          this.dialogRef.close(newBoard); // Ferme la dialog et retourne le nouveau tableau
        },
        error: (error: HttpErrorResponse) => {
          console.error('La création du tableau a échoué', error);
        },
      });
    }
    this.onNoClick();
  }
}

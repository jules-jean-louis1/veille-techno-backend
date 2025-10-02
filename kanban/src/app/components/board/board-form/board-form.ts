import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../../_services/board/board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

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

  name = '';
  description = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.boardService.create(this.name, this.description).subscribe({
      next: (newBoard) => {
        this.dialogRef.close(newBoard); // Ferme la dialog et retourne le nouveau tableau
      },
      error: (error: HttpErrorResponse) => {
        console.error('La création du tableau a échoué', error);
      },
    });
  }
}

import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BoardForm } from '../board-form/board-form';

@Component({
  selector: 'app-board-dialog-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-raised-button color="primary" (click)="openDialog()">Créer un nouveau tableau</button>
  `,
})
export class BoardDialogButton {
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(BoardForm, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La boîte de dialogue est fermée');
      // Vous pouvez ajouter ici une logique pour rafraîchir la liste des tableaux si un nouveau a été créé.
    });
  }
}

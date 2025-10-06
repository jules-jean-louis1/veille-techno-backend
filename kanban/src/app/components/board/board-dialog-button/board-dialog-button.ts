import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BoardForm } from '../board-form/board-form';
import { BoardDialogService } from '../../../_services/board/board-dialog.service';

@Component({
  selector: 'app-board-dialog-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-raised-button color="primary" (click)="openCreateDialog()">
      Créer un nouveau tableau
    </button>
  `,
})
export class BoardDialogButton {
  readonly dialog = inject(MatDialog);
  private boardDialogService = inject(BoardDialogService);

  ngOnInit() {
    // Écoute des changements de mode et de données
    this.boardDialogService.mode$.subscribe((mode) => {
      console.log('Mode actuel:', mode);
    });

    this.boardDialogService.data$.subscribe((data) => {
      console.log('Données actuelles:', data);
    });
  }

  openCreateDialog() {
    // Définir le mode `create` pour créer un nouveau tableau
    this.boardDialogService.setMode('create');
    this.boardDialogService.setData(null); // Pas de données pour le mode `create`
    this.dialog.open(BoardForm);
  }
}

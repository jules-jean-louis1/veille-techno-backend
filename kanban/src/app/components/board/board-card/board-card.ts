import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BoardService } from '../../../_services/board/board.service';
import { BoardDialogService } from '../../../_services/board/board-dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BoardForm } from '../board-form/board-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './board-card.html',
  styleUrl: './board-card.css',
})
export class BoardCardComponent {
  @Input() boardData: any;

  constructor(
    private dialog: MatDialog,
    private boardService: BoardService,
    private boardDialogService: BoardDialogService,
    private router: Router
  ) {}

  deleteBoard(): void {
    this.boardService.delete(this.boardData.id).subscribe(() => {
      console.log('Board supprimée:', this.boardData.id);
    });
  }

  editBoard(): void {
    this.boardDialogService.setMode('edit');
    this.boardDialogService.setData({ ...this.boardData });
    this.dialog.open(BoardForm);
  }

  navigate(id: number): void {
      console.log('Navigating to board:', id);
    this.router.navigate(['/board', id]);
  }
}

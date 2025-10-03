import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { BoardService } from '../../_services/board/board.service';
import { BoardCardComponent } from '../../components/board/board-card/board-card';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { BoardDialogButton } from '../../components/board/board-dialog-button/board-dialog-button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BoardDialogButton, BoardCardComponent, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  public boards$: Observable<any[]> | undefined;

  private boardService = inject(BoardService);

  ngOnInit(): void {
    this.boards$ = this.boardService.boards$;

    this.boards$.subscribe((boards) => {
      console.log('Données reçues dans HomePage:', boards); // Vérifiez les données ici
    });

    this.boardService.get(1); // Remplacez `1` par l'ID utilisateur réel
  }
}

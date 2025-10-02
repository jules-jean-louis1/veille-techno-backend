import { Component, inject } from '@angular/core';
import { BoardForm } from '../../components/board/board-form/board-form';
import { BoardService } from '../../_services/board/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [BoardForm],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {
  private boardService = inject(BoardService)
  public toogleForm = true;

  toogleBoardForm(){}
}

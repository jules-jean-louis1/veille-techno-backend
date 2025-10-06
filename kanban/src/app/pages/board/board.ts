import { Component, inject, OnInit } from '@angular/core';
import { BoardForm } from '../../components/board/board-form/board-form';
import { BoardService } from '../../_services/board/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListFormComponent } from '../../components/list/list-form/list-form';
import { Observable } from 'rxjs';
import { ListComponent } from '../../components/list/list/list';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ListFormComponent, ListComponent, AsyncPipe],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {
  private boardService = inject(BoardService);
  private route = inject(ActivatedRoute);
  
  public boards$: Observable<any[]> | undefined;
  id = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    
    this.boards$ = this.boardService.boards$;
    
    this.boardService.get(undefined, this.id);
  }

  addListToBoard(newList: any) {
    this.boards$?.subscribe((boards) => {
      const updatedBoards = boards.map((board) => {
        if (board.id === this.id) {
          return {
            ...board,
            lists: [...board.lists, newList],
          };
        }
        return board;
      });

      this.boards$ = new Observable((observer) => {
        observer.next(updatedBoards);
        observer.complete();
      });
    });
  }
}

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
  
  // boards$ est la seule variable dont nous avons besoin
  public boards$: Observable<any[]> | undefined;
  id = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    
    // On initialise boards$
    this.boards$ = this.boardService.boards$;
    
    // On déclenche la récupération des données
    this.boardService.get(undefined, this.id);
  }
}

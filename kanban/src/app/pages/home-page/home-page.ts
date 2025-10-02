import { Component } from '@angular/core';
import { BoardDialogButton } from '../../components/board/board-dialog-button/board-dialog-button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BoardDialogButton],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}

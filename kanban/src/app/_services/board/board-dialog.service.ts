import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardDialogService {
  private modeSubject = new BehaviorSubject<'edit' | 'create'>('create');
  private dataSubject = new BehaviorSubject<any>(null);

  mode$ = this.modeSubject.asObservable();
  data$ = this.dataSubject.asObservable();

  setMode(mode: 'edit' | 'create') {
    this.modeSubject.next(mode);
  }

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
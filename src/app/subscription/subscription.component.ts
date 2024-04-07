import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styles: []
})
export class SubscriptionComponent {
  status: string = '';
  currentCounter: number = 0;
  evenCounter: number = 0;
  counter: number = 0;
  counter$!: Subject<number>;

  constructor() { }

  startCounter() {
    this.counter$ = new Subject();
    this.counter = 0;
    this.status = '開始計數';

    const evenCounter$ = this.counter$.pipe(
      filter(data => data % 2 === 0)
    );

    this.counter$.subscribe({
      next: data => {
        this.currentCounter = data;
      },
      error: message => {
        this.status = `錯誤 -> ${message}`;
      },
      complete: () => {
        this.status = '完成';
      }
    });

    evenCounter$.subscribe(data => {
      this.evenCounter = data;
    });

    this.counter$.next(this.counter);
  }

  count() {
    this.counter$.next(++this.counter);
  }

  error() {
    const reason = prompt('請輸入錯誤訊息');
    this.counter$.error(reason || 'error');
  }

  complete() {
    this.counter$.complete();
  }
}

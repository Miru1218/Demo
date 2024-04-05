import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styles: []
})
export class ObservableComponent {

  constructor() {
    this.observableDemo(); // 在建構子中調用函式
    this.observableAsyncDemo(); // 在建構子中調用函式
  }

  observableDemo() {
    console.log('練習使用 new Observable');
    const source$ = new Observable(subscriber => {
      console.log('stream 開始');
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      console.log('stream 結束');
      subscriber.complete();
    });

    // 每次訂閱都是一次新的 stream
    source$.subscribe({
      next: data => console.log(`Observable 第一次訂閱: ${data}`),
      complete: () => console.log('第一次訂閱完成')
    });
    source$.subscribe({
      next: data => console.log(`Observable 第二次訂閱: ${data}`),
      complete: () => console.log('第二次訂閱完成')
    });
  }

  // Observable with async
  observableAsyncDemo() {
    console.log('練習使用 new Observable 加上非同步範例');
    const source$ = new Observable(subscriber => {
      console.log('stream 開始');
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
        console.log('stream 結束');
      });
    });

    // 每次訂閱都是一次新的 stream
    source$.subscribe({
      next: data => console.log(`Observable 第一次訂閱: ${data}`),
      complete: () => console.log('第一次訂閱完成')
    });
    source$.subscribe({
      next: data => console.log(`Observable 第二次訂閱: ${data}`),
      complete: () => console.log('第二次訂閱完成')
    });
  };

}

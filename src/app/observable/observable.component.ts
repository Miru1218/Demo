import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styles: []
})
export class ObservableComponent {

  constructor() {
    // 在建構子中調用函式，演示 Observable 的基本用法
    this.observableDemo();
    // 在建構子中調用函式，演示 Observable 的異步操作
    this.observableAsyncDemo();
  }

  // 演示使用 new Observable 创建 Observable 的基本用法
  observableDemo() {
    console.log('練習使用 new Observable');
    // 創建一個 Observable，傳入一個回調函數，這個回調函數用於定義 Observable 的行為
    const source$ = new Observable(subscriber => {
      console.log('stream 開始');
      // 向觀察者發送數據流
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      console.log('stream 結束');
      // 告訴觀察者數據流結束
      subscriber.complete();
    });

    // 每次訂閱都會創建一個新的 Observable 實例
    source$.subscribe({
      next: data => console.log(`Observable 基本第一次訂閱: ${data}`),
      complete: () => console.log('基本第一次訂閱完成')
    });
    source$.subscribe({
      next: data => console.log(`Observable 基本第二次訂閱: ${data}`),
      complete: () => console.log('基本第二次訂閱完成')
    });
  }

  // 演示使用 new Observable 创建 Observable 的異步操作
  observableAsyncDemo() {
    console.log('練習使用 new Observable 加上非同步範例');
    // 創建一個 Observable，其中包含一個異步操作
    const source$ = new Observable(subscriber => {
      console.log('stream 開始');
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      // 模擬異步操作，例如通過 setTimeout 或者 HTTP 請求
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
        console.log('stream 結束');
      });
    });

    // 每次訂閱都會創建一個新的 Observable 實例
    source$.subscribe({
      next: data => console.log(`Observable 異步第一次訂閱: ${data}`),
      complete: () => console.log('異步第一次訂閱完成')
    });
    source$.subscribe({
      next: data => console.log(`Observable 異步第二次訂閱: ${data}`),
      complete: () => console.log('異步第二次訂閱完成')
    });
  };

}

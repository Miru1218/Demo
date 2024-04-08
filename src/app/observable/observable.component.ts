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
    // 在建構子中調用函式，演示 Observable 的异步操作
    this.observableAsyncDemo();
  }

  // 演示使用 new Observable 创建 Observable 的基本用法
  observableDemo() {
    console.log('練習使用 new Observable');
    // 创建一个 Observable，传入一个回调函数，这个回调函数用于定义 Observable 的行为
    const source$ = new Observable(subscriber => {
      console.log('stream 開始');
      // 向观察者发送数据流
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      console.log('stream 結束');
      // 告诉观察者数据流结束
      subscriber.complete();
    });

    // 每次订阅都会创建一个新的 Observable 实例
    source$.subscribe({
      next: data => console.log(`Observable 第一次訂閱: ${data}`),
      complete: () => console.log('第一次訂閱完成')
    });
    source$.subscribe({
      next: data => console.log(`Observable 第二次訂閱: ${data}`),
      complete: () => console.log('第二次訂閱完成')
    });
  }

  // 演示使用 new Observable 创建 Observable 的异步操作
  observableAsyncDemo() {
    console.log('練習使用 new Observable 加上非同步範例');
    // 创建一个 Observable，其中包含一个异步操作
    const source$ = new Observable(subscriber => {
      console.log('stream 開始');
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      // 模拟异步操作，例如通过 setTimeout 或者 HTTP 请求
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
        console.log('stream 結束');
      });
    });

    // 每次订阅都会创建一个新的 Observable 实例
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

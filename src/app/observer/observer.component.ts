import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styles: []
})
export class ObserverComponent implements OnDestroy {
  private youtuber$ = new Subject(); // 定義一個 Subject，用於發送影片上架的通知
  private observerBSubscription: Subscription; // 觀察者 B 的訂閱
  private observerASubscription: Subscription; // 觀察者 A 的訂閱

  constructor() {
    console.log('--- 開始 ---');

    // 影片 1 上架，此時還沒有任何觀察者
    this.youtuber$.next(1);
    // (沒有任何輸出)

    // 建立觀察者 A 物件
    const observerA = {
      next: (id: any) => {
        console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
      },
      error: () => { }, // 沒有要處理「錯誤」的話不一定要加上這一行
      complete: () => { } // 沒有要處理「完成」的話不一定要加上這一行
    };

    // 加入觀察者 A，也就是觀察者 A 開啟通知了
    this.observerASubscription = this.youtuber$.subscribe(observerA);

    // 影片 2 上架，此時觀察者 A 會收到通知
    this.youtuber$.next(2);

    // 加入觀察者 B
    this.observerBSubscription = this.youtuber$.subscribe(id => {
      console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
    });

    // 影片 3 上架，此時觀察者 A 跟 B 都會收到通知
    this.youtuber$.next(3);

    // 移除觀察者 B
    // 在 ReactiveX 中也稱為「取消訂閱」
    this.observerBSubscription.unsubscribe();

    // 影片 4 上架，此時只剩下觀察者 A 會收到通知
    this.youtuber$.next(4);

    console.log('--- 結束 ---');
  }

  ngOnDestroy(): void {
    // 取消訂閱以避免內存洩漏
    this.observerASubscription.unsubscribe();
  }
}

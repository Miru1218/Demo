import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styles: []
})
export class SubscriptionComponent implements OnDestroy {
  status: string = ''; // 目前狀態
  currentCounter: number = 0; // 目前計數的值
  evenCounter: number = 0; // 偶數計數值
  counter: number = 0; // 計數器的值
  counter$!: Subject<number>; // 自訂 subject 來通知計數器值改變
  subscription!: Subscription; // RxJS Subscription 物件
  evenCounterSubscription!: Subscription; // 偶數計數器的訂閱
  helloMessage: string = '';

  constructor() { }

  // 開始新的計數器按鈕事件處理函數
  startCounter() {
    this.counter$ = new Subject();
    this.counter = 0;
    this.status = '開始計數';

    // 建立一個偶數計數器
    const evenCounter$ = this.counter$.pipe(
      filter(data => data % 2 === 0)
    );

    // 訂閱 counter$，顯示目前計數值，處理錯誤和完成計數的狀態
    this.subscription = this.counter$.subscribe({
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

    // 訂閱偶數計數器，顯示偶數計數值
    this.evenCounterSubscription = evenCounter$.subscribe(data => {
      this.evenCounter = data;
    });

    // 送出預設值
    this.counter$.next(this.counter);

    // 建立並訂閱另一個 Observable，5 秒後取消訂閱
    const anotherObservable = new Observable(subscriber => {
      // 模擬一個異步操作
      const intervalId = setInterval(() => {
        subscriber.next('Hello');
      }, 1000);
      // 返回一個 Subscription 物件
      return () => {
        clearInterval(intervalId);
        console.log('Subscription 已取消');
      };
    });
    // 返回一個 Subscription 物件
    const anotherSubscription = anotherObservable.subscribe(value => console.log(value));
    // 5 秒後取消訂閱
    setTimeout(() => {
      anotherSubscription.unsubscribe();
    }, 5000);
  }

  // 計數按鈕事件處理函數
  count() {
    this.counter$.next(++this.counter);
  }

  // 錯誤按鈕事件處理函數
  error() {
    const reason = prompt('請輸入錯誤訊息');
    this.counter$.error(reason || 'error');
  }

  // 完成按鈕事件處理函數
  complete() {
    this.counter$.complete();
  }

  // 取消訂閱按鈕事件處理函數
  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      // 取消偶數計數器的訂閱
      this.evenCounterSubscription.unsubscribe();
      this.status = '已取消訂閱';
    } else {
      console.warn('Subscription is not initialized');
    }
  }

  ngOnDestroy() {
    // 在組件被銷毀時取消訂閱，避免內存洩漏
    this.unsubscribe();
  }
}

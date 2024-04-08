import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styles: []
})
export class ObserverComponent implements OnDestroy {
  private youtuber$ = new Subject<number>();
  private observerASubscription: Subscription;
  private observerBSubscription: Subscription;

  constructor() {
    console.log('--- 開始 ---');

    // 影片 1 上架，此時還沒有觀察者
    this.youtuber$.next(1);

    // 建立觀察者 A 物件
    const observerA = {
      next: (id: number) => {
        console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
      }
    };
    // 加入觀察者 A
    this.observerASubscription = this.youtuber$.subscribe(observerA);

    // 影片 2 上架，此時觀察者 A 會收到通知
    this.youtuber$.next(2);

    // 加入觀察者 B
    this.observerBSubscription = this.youtuber$.subscribe((id: number) => {
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

import { Component } from '@angular/core';

// 觀察者 A
class ObserverA {
  notify(id: number): void {
    console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
  }
}

// 觀察者 B
class ObserverB {
  notify(id: number): void {
    console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
  }
}

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styles: [
  ]
})
export class ObserverComponent {
  observers: any[] = [];

  constructor() {
    console.log('--- 開始 ---');

    // 影片 1 上架，此時還沒有觀察者
    this.notifyObservers(1);

    // 加入觀察者 A，也就是觀察者 A 開啟通知了
    this.addObserver(new ObserverA());
    // 影片 2 上架，此時觀察者 A 會收到通知
    this.notifyObservers(2);

    // 加入觀察者 B，也就是觀察者 B 開啟通知了
    this.addObserver(new ObserverB());
    // 影片 3 上架，此時觀察者 A 跟 B 都會收到通知
    this.notifyObservers(3);

    // 移除觀察者 B，也就是觀察者 B 關閉通知了
    this.deleteObserver(new ObserverB());
    // 影片 4 上架，此時只剩下觀察者 A 會收到通知
    this.notifyObservers(4);

    console.log('--- 結束 ---');
  }

  // 通知所有觀察者新影片上架了
  notifyObservers(id: number): void {
    // 列舉出每個觀察者，並進行通知動作
    this.observers.forEach(observer => {
      observer.notify(id);
    });
  }

  // 加入新的觀察者，也就是有新使用者開啟通知了
  addObserver(observer: any): void {
    this.observers.push(observer);
  }

  // 將某個觀察者移除，也就是某個使用者關閉通知了
  deleteObserver(observerToRemove: any): void {
    this.observers = this.observers.filter(observer => observer.constructor !== observerToRemove.constructor);
  }

}

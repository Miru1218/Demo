import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservableComponent } from './observable/observable.component';
import { ObserverComponent } from './observer/observer.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: '', redirectTo: '/observable', pathMatch: 'full' },
  { path: 'observable', component: ObservableComponent },
  { path: 'observer', component: ObserverComponent },
  { path: 'subscription', component: SubscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

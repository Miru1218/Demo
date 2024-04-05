import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservableComponent } from './observable/observable.component';
import { ObserverComponent } from './observer/observer.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { RoutesComponent } from './routes/routes.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableComponent,
    ObserverComponent,
    SubscriptionComponent,
    RoutesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

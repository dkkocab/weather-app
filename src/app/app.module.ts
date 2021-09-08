import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentTempComponent } from './views/currentTemp/current-temp.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { ForecastComponent } from './views/forecast/forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CurrentTempComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: CurrentTempComponent},
      {path: 'forecast', component: ForecastComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

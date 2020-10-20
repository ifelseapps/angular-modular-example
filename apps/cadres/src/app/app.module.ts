import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '@cadres/ui';
import { CoreModule } from '@cadres/core';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, UiModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

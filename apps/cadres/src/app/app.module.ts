import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Route, Router, RouterModule } from '@angular/router';
import { UiModule } from '@cadres/ui';
import { CoreModule } from '@cadres/core';


const routes: Route[] = [
  {
    path: 'recruiting',
    loadChildren: () => import('@cadres/recruiting').then(m => m.RecruitingModule),
  },
  {
    path: 'staff',
    loadChildren: () => import('@cadres/staff').then(m => m.StaffModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes), UiModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitingIndexComponent } from './pages/recruiting-index/recruiting-index.component';
import { Route, RouterModule } from '@angular/router';
import { RecruitingRoutesModule } from './recruiting-routes.module';

@NgModule({
  declarations: [RecruitingIndexComponent],
  imports: [
    CommonModule,
    RecruitingRoutesModule,
  ]
})
export class RecruitingModule { }

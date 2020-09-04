import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { RecruitingIndexComponent } from './pages/recruiting-index/recruiting-index.component';

const routes: Route[] = [
  {
    path: '',
    component: RecruitingIndexComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecruitingRoutesModule { }

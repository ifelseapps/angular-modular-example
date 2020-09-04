import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { StaffIndexComponent } from './pages/staff-index/staff-index.component';

const routes: Route[] = [
  {
    path: '',
    component: StaffIndexComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class StaffRoutingModule { }

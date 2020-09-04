import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffIndexComponent } from './pages/staff-index/staff-index.component';
import { StaffRoutingModule } from './staff-routing.module';



@NgModule({
  declarations: [StaffIndexComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
  ]
})
export class StaffModule { }

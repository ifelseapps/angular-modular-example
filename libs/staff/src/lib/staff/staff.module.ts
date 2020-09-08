import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffIndexComponent } from './pages/staff-index/staff-index.component';
import { StaffRoutingModule } from './staff-routing.module';
// @ts-ignore
import { CoreModule } from '@cadres/core';
// @ts-ignore
import { UiModule } from '@cadres/ui';



@NgModule({
  declarations: [StaffIndexComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    CoreModule,
    UiModule
  ]
})
export class StaffModule { }

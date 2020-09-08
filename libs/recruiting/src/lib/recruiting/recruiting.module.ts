import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitingIndexComponent } from './pages/recruiting-index/recruiting-index.component';
import { RecruitingRoutesModule } from './recruiting-routes.module';
// @ts-ignore
import { CoreModule } from '@cadres/core';
// @ts-ignore
import { UiModule } from '@cadres/ui';

@NgModule({
  declarations: [RecruitingIndexComponent],
  imports: [
    CommonModule,
    RecruitingRoutesModule,
    CoreModule,
    UiModule
  ]
})
export class RecruitingModule { }

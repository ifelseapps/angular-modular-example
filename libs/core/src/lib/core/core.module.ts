import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTEXT } from './services/context/context.token';
import { ContextService } from './services/context/context.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    { provide: CONTEXT, useClass: ContextService },
  ]
})
export class CoreModule { }

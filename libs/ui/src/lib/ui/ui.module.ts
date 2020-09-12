import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { VerticalMenuComponent } from './vertical-menu/vertical-menu.component';



@NgModule({
  declarations: [MenuComponent, VerticalMenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MenuComponent]
})
export class UiModule { }

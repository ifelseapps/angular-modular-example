import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';



@NgModule({
  declarations: [MenuComponent, MainMenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MenuComponent, MainMenuComponent]
})
export class UiModule { }

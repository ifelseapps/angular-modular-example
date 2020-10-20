
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
  
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
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
  
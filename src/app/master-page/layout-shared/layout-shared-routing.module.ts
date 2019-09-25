import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutSharedComponent } from './layout-shared.component';
const routes: Routes = [
  {
    path: '', component: LayoutSharedComponent,
    children: [
      { path: '', loadChildren: () => import('../../page/home/home.module').then(m => m.HomeModule)},
      { path: 'trainer-profile/:name/:id', loadChildren: () => import('../../page/trainer-profile/trainer-profile.module').then(m => m.TrainerProfileModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutSharedRoutingModule { }

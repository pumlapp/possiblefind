import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutSharedComponent } from './layout-shared.component';
import { AuthGuard } from '../../shared/_services/_guards/auth.guard';
import { HomeModule } from '../../page/home/home.module';
const routes: Routes = [
  {
    path: '', component: LayoutSharedComponent,
    //canActivate: [AuthGuard],
    children: [
       { path: 'home',  loadChildren: () => HomeModule  },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutSharedRoutingModule { }

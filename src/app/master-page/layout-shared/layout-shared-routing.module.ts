import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutSharedComponent } from './layout-shared.component';
import { AuthGuard } from '../../shared/_services/_guards/auth.guard';
import { HomeModule } from '../../page/home/home.module';
import { TrainerProfileModule } from '../../page/trainer-profile/trainer-profile.module';
const routes: Routes = [
  {
    path: '', component: LayoutSharedComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '',  loadChildren: '../../page/home/home.module#HomeModule'  },
    //  { path: 'trainer-profile/:id',  loadChildren: () => TrainerProfileModule  },
      { path: 'trainer-profile/:id',  loadChildren: '../../page/trainer-profile/trainer-profile.module#TrainerProfileModule'  },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutSharedRoutingModule { }

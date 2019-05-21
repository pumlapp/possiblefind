
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';

import { LayoutSharedModule } from '../app/master-page/layout-shared/layout-shared.module';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
    { path: '', loadChildren: () => LayoutSharedModule},
   // { path: '', loadChildren: '../app/master-page/layout-shared/layout-shared.module#LayoutSharedModule'  },

    // { path: '',   component: HomeComponent },
   //  { path: 'home', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
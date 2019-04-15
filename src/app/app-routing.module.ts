
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';

import { LayoutSharedModule } from '../app/master-page/layout-shared/layout-shared.module';

const routes: Routes = [
    { path: '', loadChildren: () => LayoutSharedModule},
     { path: '',  redirectTo: 'login', pathMatch:"full"},
     { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
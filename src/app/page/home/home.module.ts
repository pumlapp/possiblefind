import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { NgxCarouselModule } from 'ngx-carousel';
import { MaterialModule } from '../../shared/material.module';
import { HereMapModule } from '../../shared/_component/here-map/here-map.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { GhostElementModule } from '../../shared/_component/ghost-element/ghost-element.module';
import { GhostComponentService } from '../../shared/_component/ghost-element/ghost-element.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgxCarouselModule,
    MaterialModule,
    HereMapModule,
    NgSelectModule,
    GhostElementModule
  ],
  exports:[
  ],
  providers: [
    GhostComponentService
  ],
  declarations: [
    HomeComponent
  ],  
   schemas: [
    NO_ERRORS_SCHEMA,
  ],
}) 
export class HomeModule { }

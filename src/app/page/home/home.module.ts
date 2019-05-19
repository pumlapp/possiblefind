import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { NgxCarouselModule } from 'ngx-carousel';
import { MaterialModule } from '../../shared/material.module';
import { HereMapComponent } from '../../shared/_component/here-map/here-map.component';
import { SharedModule } from '../../shared/shared.module';
import { HereMapModule } from '../../shared/_component/here-map/here-map.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgxCarouselModule,
    MaterialModule,
    HereMapModule,
    NgSelectModule
  ],
  exports:[
  ],
  declarations: [
    HomeComponent
  ],  
   schemas: [
    NO_ERRORS_SCHEMA,
  ],
}) 
export class HomeModule { }

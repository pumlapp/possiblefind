
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerProfileComponent } from './trainer-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainerProfileRoutingModule } from './trainer-profile-routing.module';
import { MaterialModule } from '../../shared/material.module';
import { OnePointModule } from '../../shared/_component/one-point/one-point.module';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrainerProfileRoutingModule,
    Ng2CarouselamosModule,
    MaterialModule, 
    OnePointModule
  ],
  exports:[
  ],
  declarations: [
    TrainerProfileComponent,
  ],  
   schemas: [
    NO_ERRORS_SCHEMA,
  ],
}) 
export class TrainerProfileModule { }

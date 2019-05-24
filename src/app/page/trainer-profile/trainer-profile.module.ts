
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerProfileComponent } from './trainer-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainerProfileRoutingModule } from './trainer-profile-routing.module';
import { MaterialModule } from '../../shared/material.module';
import { OnePointModule } from '../../shared/_component/one-point/one-point.module';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { PumlVideoPlayerModule } from '../../shared/_component/puml-video-player/puml-video-player.module';
import { ControlMessageModule } from '../../shared/_component/control-message/control-message.module';
import { ValidationFormService } from '../../shared/_services/validation-form/validation-form.service';

import {RatingModule} from "ngx-rating";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrainerProfileRoutingModule,
    Ng2CarouselamosModule,
    MaterialModule, 
    OnePointModule,
    PumlVideoPlayerModule,
    ControlMessageModule,
    RatingModule
    
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


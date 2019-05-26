import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { PumlVideoPlayerComponent } from './puml-video-player.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [

    PumlVideoPlayerComponent
  ],
  declarations: [
    PumlVideoPlayerComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})
export class PumlVideoPlayerModule { }

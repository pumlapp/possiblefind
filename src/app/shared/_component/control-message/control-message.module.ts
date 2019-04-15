import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ControlMessageComponent } from './control-message.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ControlMessageComponent
  ],
  declarations: [
    ControlMessageComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})
export class ControlMessageModule { }

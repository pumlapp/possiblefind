
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhostElementComponent } from './ghost-element.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    GhostElementComponent
  ],
  declarations: [
    GhostElementComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})
export class GhostElementModule { }

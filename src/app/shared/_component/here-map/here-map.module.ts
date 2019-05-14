import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HereMapComponent } from './here-map.component';

@NgModule({
 exports:[
    HereMapComponent
 ],
  declarations: [
    HereMapComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})

export class HereMapModule { }

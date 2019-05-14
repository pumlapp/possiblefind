
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { OnePointComponent } from './one-point.component';

@NgModule({
 exports:[
    OnePointComponent
 ],
  declarations: [
    OnePointComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})

export class OnePointModule { }

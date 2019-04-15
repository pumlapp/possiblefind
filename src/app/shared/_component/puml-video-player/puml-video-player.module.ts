import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { PumlVideoPlayerComponent } from './puml-video-player.component';

@NgModule({
 exports:[
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

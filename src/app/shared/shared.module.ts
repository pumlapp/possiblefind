import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxCarouselModule } from 'ngx-carousel';
import { LoadingModule } from 'ngx-loading';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { EventMessage } from './_services/event-message/event-message.service';
import { Broadcaster } from './_services/event-message/broadcaster.service';
import 'hammerjs';
import { HttpService } from './_services/http/http-service.service';
import { HttpRequestService } from './_services/http/http-request.service';
import { ValidationFormService } from './_services/validation-form/validation-form.service';
import { ControlMessageModule } from './_component/control-message/control-message.module';
import { DeferLoadModule } from '@trademe/ng-defer-load';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCknSrYr7gD6rLac1tF3BXopEwWrp-jwME'
    }),
    DeferLoadModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgSelectModule,
    Ng2CarouselamosModule,
    NgxPaginationModule,
    NgxCarouselModule,
    LoadingModule.forRoot({
      backdropBackgroundColour: 'rgba(255,255,255,0.5)',
      primaryColour: 'rgba(218, 242, 234, 0.3)',
      secondaryColour: 'rgba(189, 232, 218, 0.7)',
      tertiaryColour: '#1AADAD',
      fullScreenBackdrop: true
    }),
    PerfectScrollbarModule,
    HttpClientModule,
    ControlMessageModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DeferLoadModule,
    FlexLayoutModule,
    NgxPaginationModule,
    AgmCoreModule,
    NgxCarouselModule,
    NgSelectModule,
    Ng2CarouselamosModule,
    TranslateModule,
    LoadingModule,
    PerfectScrollbarModule,
    ControlMessageModule
  ],
  providers: [
    EventMessage,
    Broadcaster,
    HttpService,
    HttpRequestService,
    ValidationFormService
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}

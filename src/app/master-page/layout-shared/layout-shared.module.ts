import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutSharedComponent } from './layout-shared.component';
import {LayoutSharedRoutingModule } from './layout-shared-routing.module';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutSharedRoutingModule,
  ],
  exports:[
  ],
  declarations: [
    LayoutSharedComponent,
    HeaderComponent,
    FooterComponent

  ],   schemas: [
    NO_ERRORS_SCHEMA,
  ],
}) 
export class LayoutSharedModule { }

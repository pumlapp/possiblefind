import { NgModule, NO_ERRORS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/_services/_guards/auth.guard';
import { LoginComponent } from './page/login/login.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    exports:[
        SharedModule,
    ],
    providers: [
        AuthGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
      ],
    entryComponents: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }





import {
  MatTabsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatGridListModule
} from '@angular/material';
import { 
  MatDatetimepickerModule,MAT_DATETIME_FORMATS, DatetimeAdapter,MatDatetimeFormats} from '@mat-datetimepicker/core';
import { NgModule } from '@angular/core';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatMomentDatetimeModule, MomentDatetimeAdapter } from '@mat-datetimepicker/moment';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  imports: [
    MatTabsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    MatGridListModule
  ],
  exports: [
    MatTabsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    MatGridListModule
  ],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]},
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    
    {
      provide: MatDialogRef,
      useValue: {}
    }, {
      provide: MAT_DIALOG_DATA,
      useValue: {} // Add any data you wish to test if it is passed/used correctly
    },
    {
      provide: DatetimeAdapter,
      useClass: MomentDatetimeAdapter},
    {  
    provide: MAT_DATETIME_FORMATS,
    
    useValue: {
      
      parse: {
        monthInput: "MM",
        timeInput: "LT",
        datetimeInput: "LL LT"
      },
      display: {
        monthInput: "MM",
        datetimeInput: "LL LT",
        timeInput: "LT",
        monthYearLabel: "MM, YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MM, YYYY",
        popupHeaderDateLabel: "MMM D, YYYY",
        popupHeaderTimeLabel: "LT",
      }
    }}
  ],
})

export class MaterialModule {
}

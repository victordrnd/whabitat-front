import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NbLayoutModule, NbCalendarRangeModule, NbButtonModule, NbCardModule, NbSelectModule, NbContextMenuModule } from '@nebular/theme';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [CalendarComponent, NavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    NbCalendarRangeModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbSelectModule,
    NgxSpinnerModule,
    NbContextMenuModule
  ],
  exports: [
    NavigationComponent,
    CalendarComponent
  ]
})
export class SharedModule { }
 
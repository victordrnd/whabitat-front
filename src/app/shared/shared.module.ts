import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NbLayoutModule, NbCalendarRangeModule, NbButtonModule, NbCardModule, NbSelectModule } from '@nebular/theme';
@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    NbCalendarRangeModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbSelectModule
  ]
})
export class SharedModule { }
 
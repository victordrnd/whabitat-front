import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NbLayoutModule, NbCalendarRangeModule, NbButtonModule, NbCardModule, NbSelectModule } from '@nebular/theme';
import { NavigationComponent } from './components/navigation/navigation.component';
@NgModule({
  declarations: [CalendarComponent, NavigationComponent],
  imports: [
    CommonModule,
    NbCalendarRangeModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbSelectModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class SharedModule { }
 